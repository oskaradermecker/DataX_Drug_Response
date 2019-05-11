#!/usr/bin/python

## prediction.py

#to run: python3 prediction.py -i sample.csv
#sample.csv is a one-line csv containing binary mutation data

import sys, json, numpy as np, getopt, pandas as pd, pickle

feature_selection = {"CI-1040": ["MYC_mut","RB1_mut","ERBB2_amp","BRAF_mut","KRAS_mut","NRAS_mut"],
              "PD0325901": ["MYC_mut","RB1_mut","ERBB2_amp","BRAF_mut","KRAS_mut","NRAS_mut"],
              "Refametinib":["MYC_mut","RB1_mut","ERBB2_amp","BRAF_mut","KRAS_mut","NRAS_mut"],
              "VX-11e":["RB1_mut","ERBB2_amp","CCND1_amp","BRAF_mut","KRAS_mut","NRAS_mut"],
              "Afatinib":["KRAS_mut","NRAS_mut","EGFR_amp","ERBB2_amp","FOXP3_del"],
              "Pelitinib":["BRAF_mut","RB1_mut","MAPK1_del","MYC_mut","EGFR_mut","CDKN1B_del"]
             }

# Takes in a one-row dataframe with mutation data
def predict(patient_data, drugs='all'):

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


def main(filename):
    #read in file
    patient_data = pd.read_csv(filename)
    predictions = predict(patient_data)
    output_name = filename.split('.csv')[0] + '_predictions.json'
    print('------ RESULTS ------')
    print(predictions)
    print('outputting to ' + output_name)

    predictions.to_json(output_name)

#start process
if __name__ == "__main__":
    if len(sys.argv) == 2:
        main(sys.argv[1])
