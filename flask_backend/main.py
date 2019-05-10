import os
import flask
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
from flask import send_file
from flask import render_template
from werkzeug import secure_filename
import uuid



# app = Flask(__name__) #create the Flask app
#
# @app.route('/FileUpload', methods=['POST'])
# def jsonexample():
#     req_data = request.get_json()
#     filename = req_data['filename']
#     return run_prediction(filename)
#
# if __name__ == '__main_':
#     app.run(debug=True, port=5000)



#
#
# import os
# from flask import Flask, flash, request, redirect, url_for, session
# from werkzeug.utils import secure_filename
# from flask_cors import CORS, cross_origin
# import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')



UPLOAD_FOLDER = '/Users/clairedubin/datax/drugs/DataX_Drug_Response-Emma/'
ALLOWED_EXTENSIONS = set(['csv'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# @app.route('/upload', methods=['POST'])
# def fileUpload():
#     target=os.path.join(UPLOAD_FOLDER,'test_docs')
#     if not os.path.isdir(target):
#         os.mkdir(target)
#     logger.info("welcome to upload`")
#     file = request.files['file']
#     filename = secure_filename(file.filename)
#     destination="/".join([target, filename])
#     file.save(destination)
#     session['uploadFilePath']=destination
#     response=run_prediction(filename)
#     return response


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            # filename = secure_filename(file.filename)
            filename = str(uuid.uuid4())
            input_filename = filename + '.csv'
            input_path = os.path.join(app.config['UPLOAD_FOLDER'], input_filename)
            file.save(input_path)
            results_filename = run_prediction(input_path)
            url_output = filename + '.json'
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], results_filename))
            redirect_url = redirect("http://localhost:3000/results/" + url_output)
            return redirect_url
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''
# @app.route("/localhost:3000/upload/<results_filename>")
# def redirected():
#     return "You were redirected. Congrats :)!"



from flask import send_from_directory

# @app.route('<filename>')
# def uploaded_file(filename):
#     return redirect("localhost:3000/upload/" + filename)
# @app.route('/results/<filename>')
# def upload(filename):
#
#     return render_template('upload.html')



# if __name__ == "__main__":
#     app.secret_key = os.urandom(24)
#     app.run(debug=True,host="0.0.0.0",use_reloader=False)

# flask_cors.CORS(app, expose_headers='Authorization')

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
    sensitive_df = df[df['Response'] == 'Sensitive'].sort_values(by='Certainty', ascending=False)
    return sensitive_df


def run_prediction(filename):
    #read in file
    patient_data = pd.read_csv(filename)
    predictions = predict(patient_data)
    output_name = filename.split('.csv')[0] + '_predictions.json'
    print('------ RESULTS ------')
    print('outputting to ' + output_name)
    predictions.to_json(output_name)
    return output_name



if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000',debug=True)
    # app.run(host='0.0.0.0', port='3000',debug=True)

# flask_cors.CORS(app, expose_headers='Authorization')
