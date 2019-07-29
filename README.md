# DataX_Drug_Response
Please see "Master" branch for complete details

# Data Importation 
These scripts include code for importing data from public databases (CCLE, CTRP, GDSC) to construct a dataframe consisting of cell lines as rows and mutations as features.

# Feature Selection
Features selected using Recursive Feature Elimination (RFE) in conjunction with other modeling techniques such as SVM and Logistic Regression.

# Modeling
This is a comprehensive script which includes steps from data importation and feature selection as well as models:
1. Linear Regression (w cross validation)
2. Least Absolute Shrinkage & Selection Operator (LASSO) (w cross validation)
3. Ridge Regression (w cross validation)
4. Elastic Net (w cross validation)

*** Final results are not displayed -> an alternative feature engineering approach was utilized which significantly improved results

