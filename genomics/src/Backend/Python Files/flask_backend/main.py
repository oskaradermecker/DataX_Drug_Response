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

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')



UPLOAD_FOLDER = '/Users/clairedubin/datax/drugs/DataX_Drug_Response-Emma/sample_csv.csv'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    response="Whatever you wish to return"
    return response

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)

flask_cors.CORS(app, expose_headers='Authorization')
