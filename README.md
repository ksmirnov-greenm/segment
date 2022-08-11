# Deploy
1. parcel build src/index.html -d dist
2. twilio serverless:deploy      

# Notes
OpenEMR API does not return whole information we need (ex. hipaa_allowemail). 
Source code of OpenEmr is updated. File 'src/services/PatientService.php'-> method getAll() -> 'SELECT' statement.
