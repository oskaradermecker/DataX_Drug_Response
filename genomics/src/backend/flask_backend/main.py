import os
import flask
from flask import Flask, flash, request, redirect, url_for, session, send_file, render_template
from werkzeug.utils import secure_filename
import logging
from werkzeug import secure_filename
import uuid
from flask_cors import CORS, cross_origin

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


# UPLOAD_FOLDER = './uploaded_files'
UPLOAD_FOLDER = '/Users/nyerasi/Desktop/DataX_Drug_Response/genomics/src/backend/flask_backend'
ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['GET','POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000/upload',headers=['Content-Type','Authorization', 'Access-Control-Allow-Origin'])
def upload_file():
    print('request from front-end:', request)
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        print(request.files)
        # if user does not select file, browser also
        # submit an empty part without filename
        # if file.filename == '':
        #     flash('No selected file')
        #     return redirect(request.url)
        # if file:
            # filename = secure_filename(file.filename)
        filename = str(uuid.uuid4())
        input_filename = filename + '.csv'
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], input_filename)
        file.save(input_path)
        results_filename = run_prediction(input_path)
        # url_output = filename + '.json'
        # file.save(os.path.join(app.config['UPLOAD_FOLDER'], results_filename))
        # redirect_url = redirect("http://localhost:8000/results/" + url_output)
        return results_filename

from flask import send_from_directory

import sys, json, numpy as np, getopt, pandas as pd, pickle

feature_selection = {"CI-1040": ["MYC_mut","RB1_mut","ERBB2_amp","BRAF_mut","KRAS_mut","NRAS_mut"],
              "PD0325901": ["MYC_mut","RB1_mut","ERBB2_amp","BRAF_mut","KRAS_mut","NRAS_mut"],
              "Refametinib":["MYC_mut","RB1_mut","ERBB2_amp","BRAF_mut","KRAS_mut","NRAS_mut"],
              "VX-11e":["RB1_mut","ERBB2_amp","CCND1_amp","BRAF_mut","KRAS_mut","NRAS_mut"],
              "Afatinib":["KRAS_mut","NRAS_mut","EGFR_amp","ERBB2_amp","FOXP3_del"],
              "Pelitinib":["BRAF_mut","RB1_mut","MAPK1_del","MYC_mut","EGFR_mut","CDKN1B_del"]
             }

# Takes in a one-row dataframe with mutation data
def predict(patient_data):

    results = []

    #import models for each drug
    drugs = ['CI-1040','PD0325901','Refametinib','VX-11e','Afatinib','Pelitinib']
    models = {}
    for i in drugs:
        with open(i + '.sav', 'rb') as file:
            models[i] = pickle.load(file)
    # For each drug
    for i in models.keys():
        to_predict = patient_data.loc[:,feature_selection.get(i)]
        to_predict = to_predict.fillna(0)
        # Predict
        clf = models.get(i)[0]
        result = clf.predict(to_predict.values)
        probabilities = clf.predict_proba(to_predict.values.tolist())
        results.append([i, result[0], max(probabilities[0])])
    df = pd.DataFrame(data=results, columns = ['Drug', 'Response', 'Certainty'])
    df['Response'] = ['Resistant' if x==0 else 'Sensitive' for x in df['Response']]
    sensitive_df = df[df['Response'] == 'Sensitive'].sort_values(by='Certainty', ascending=False)
    print('DATAFRAME:', sensitive_df)
    return sensitive_df

def run_prediction(filename):
    #read in file
    patient_data = pd.read_csv(filename)
    predictions = predict(patient_data)
    output_name = filename.split('.csv')[0] + '_predictions.json'
    # output_name = 'patient_predictions.json'
    print('------ RESULTS ------')
    print('outputting to ' + output_name)
    output_string = predictions.to_json(orient='index')

    # testing how to write files
    with open(output_name,"w") as fo:
        fo.write(str(output_string))
    return output_name

if __name__ == "__main__":
    app.secret_key = "genomics"
    app.run(host='0.0.0.0', port=8000, debug=True)
