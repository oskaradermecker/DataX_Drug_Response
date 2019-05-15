# DataX_Drug_Response

The oncology pharmaceutics and genome sequencing industries are booming, and a significant challenge in modern medicine is analyzing the influx of data from these sources. Over one thousand cancer drugs are currently in development, and patient genomic data is becoming readily accessible to physicians. There is little room for trial and error when treating cancer, and it is imperative that physicians make informed decisions when prescribing drugs. By combining drug response data and genomic information, physicians can make informed treatment decisions based on the unique biology of each patient — a practice known as personalized medicine.

In this project, multiple methods of feature selection (PCA, Lasso, RFE, RF, Netphix) were used to identify important markers in mutation data that affect drug therapy response. Machine learning methods (SVM, Logistic Regression, MLP, Random Forest) were then applied to train classifiers used to predict the sensitivity of drugs in cancerous cell lines based on these genetic mutations. 

Our final deliverable is a web application that makes this tool available to physicians. Clinicians can upload their patient's mutation data directly into the application, and will be provided with a list of drugs that the patient will likely be sensitive to. This is of critical importance in a world where more and more anti-cancer drugs are being developed, and medical doctors face the ever-increasing challenge of prescribing the right drug that will work best for an individual patient.

# Files

## 1. `data_exploration_dr.ipynb`
This first notebook contains some brief exploratory data analyis. Although it is by no means aimed at carrying a thorough analysis of the feature correlations, it provides a good starting point to get an intuitive understanding of the datasets.

## 2. `data_wrangling_dr.ipynb`
This second notebook outputs the alterations/drug response matrices used in the predictive analysis (notebook 3). It contains the preprocessing of the datasets, and compares their different sizes. The aim of this step is to create the notebook with the largest number of cell lines possible.

## 3. `predictions_dr.ipynb`
This third notebook evaluates different feature selection methods and different machine learning models on the data. Further preprocessing such as categorisation is also performed and the results are stored in a dataframe which can then be saved for further analysis.

## 4. `results_dr.ipynb`
This last notebook plots the results obtained in notebook 3. Barcharts of the validation accuracies are generated. Most of the analysis is done in the report.

# Sources

This project uses several public datasets: 

##### 1. GDSC: https://www.cancerrxgene.org/
##### 2. CCLE: https://portals.broadinstitute.org/ccle
##### 3. CTRP: https://portals.broadinstitute.org/ctrp/
##### 4. Depmap Project: https://depmap.org/portal/
