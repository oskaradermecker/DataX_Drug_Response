# import Flask
#
#  # app = Flask(__name__, static_folder='./react-frontend/build/static',
#  #            template_folder='./react-frontend/build')
#
# app = flask.Flask('___main___')
#
# @app.route('/')
# def my_index():
#     return flask.render_template('index.html', token='Hello Flask+React')
#
# app.run(debug=True)
import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
from flask import send_file
from flask import render_template
from werkzeug import secure_filename
app = Flask(__name__)

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


UPLOAD_FOLDER = '/Users/clairedubin/datax/drugs/DataX_Drug_Response-Emma/'
ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# @app.route('/upload', methods=['POST'])
# def fileUpload():
#     # return render_template('settings.html', data=data)
#     target=os.path.join(UPLOAD_FOLDER,'test_docs')
#     if not os.path.isdir(target):
#         os.mkdir(target)
#     logger.info("welcome to upload`")
#     file = request.files['file']
#     filename = secure_filename(file.filename)
#     predictions = run_prediction(filename)
#     return send_file(predictions)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You want path: %s' % path

@app.route('/upload')
def upload_file():
   return render_template('upload.html')

@app.route('/uploader', methods = ['POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      f.save(secure_filename(f.filename))
      return 'file uploaded successfully'

# if __name__ == "__main__":
#     app.secret_key = os.urandom(24)
#     app.run(debug=True,host="0.0.0.0",use_reloader=False)
#
# flask_cors.CORS(app, expose_headers='Authorization')


# @app.route('/return-files/')
# def return_files_tut():
# 	return run_prediction(filename)


# -----------
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
    return df


def run_prediction(filename):
    #read in file
    patient_data = pd.read_csv(filename)
    predictions = predict(patient_data)
    output_name = filename.split('.csv')[0] + '_predictions.json'
    print('------ RESULTS ------')
    print(predictions)
    print('outputting to ' + output_name)
    return predictions.to_json(output_name)



if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)

flask_cors.CORS(app, expose_headers='Authorization')
