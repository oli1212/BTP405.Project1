from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import mysql.connector

db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="password",
    port="3306",
    database="Hospital"
)
cursor = db.cursor()


def getAllPatients():# get all patient query
    cursor.execute("SELECT * FROM patients")
    return cursor.fetchall()

def getPatientByID(params):# get patient by id
    cursor.execute("SELECT * FROM patients WHERE PatientID = %s", params)
    return cursor.fetchone()

def getPatientIDByClinicNum(params): # get patient by clinic number
    cursor.execute("SELECT * FROM patients WHERE ClinicNumber = %s", params)
    return cursor.fetchone()

def getPatientsCreds():# get all patient query
    cursor.execute("SELECT * FROM PatientCred")
    return cursor.fetchall()

def getAllRecords():# get all records query
    cursor.execute("SELECT * FROM LabRecord")
    return cursor.fetchall()

def getAllRecordsByID(params):# get all records for a specific patient
    cursor.execute("SELECT * FROM LabRecord WHERE PatientID = %s", params)
    return cursor.fetchall()

def getAllAllergies():# get all patient query
    cursor.execute("SELECT * FROM PatientsAllergy")
    return cursor.fetchall()

def getAllAllergiesByID(params):# get all allergies for a specific patient
    cursor.execute("SELECT * FROM PatientsAllergy WHERE PatientID = %s", params)
    return cursor.fetchall()

def insertPatientInfo(table, params): # functions for inserting data into tables in the database
    if table == 'patients':# insert into table patients
        cursor.execute("INSERT INTO patients (ClinicNumber, Birthday, FirstName, Surname, Email) VALUES (%s, %s, %s, %s, %s)", params)
        db.commit()
    elif table == 'PatientCred': # insert into table PatientCred
        cursor.execute("INSERT INTO PatientCred (PatientID, Username, patientPassword) VALUES (%s, %s, %s)", params)
        db.commit()
    elif table == 'PatientsAllergy': # insert into table PatientsAllergy
        cursor.execute("INSERT INTO PatientsAllergy (PatientID, AllergyType, PatientAllergyDesc) VALUES (%s, %s, %s)", params)
        db.commit()
    elif table == 'LabRecord': # insert into table LabRecord
        cursor.execute("INSERT INTO LabRecord (PatientID, RecordsDesc) VALUES (%s, %s)", params)
        db.commit()

def updatePatientInfo(table, params): # functions for inserting data into tables in the database
    if table == 'patients':# update data in table patients
        cursor.execute("UPDATE patients SET Birthday = %s, FirstName = %s, Surname = %s, Email = %s WHERE PatientID = %s", params)
        db.commit()
    elif table == 'PatientCred': # update data in table PatientCred
        cursor.execute("UPDATE PatientCred SET Username = %s, patientPassword = %s WHERE PatientID = %s", params)
        db.commit()
    elif table == 'PatientsAllergy': # update data in table PatientsAllergy
        cursor.execute("UPDATE PatientsAllergy SET AllergyType = %s, PatientAllergyDesc = %s WHERE PatientID = %s AND PatientsAllergyID = %s", params)
        db.commit()
    elif table == 'LabRecord': # update data in table LabRecord
        cursor.execute("UPDATE LabRecord SET RecordsDesc = %s WHERE PatientID = %s AND LabRecordID = %s", params)
        db.commit()

def deletePatientInfo(table, params): # functions for deleting data into tables in the database
    if table == 'patients': # delete from table patients
        cursor.execute("DELETE FROM patients WHERE PatientID = %s", params)
        db.commit()
    elif table == 'PatientCred': # delete from table PatientCred
        cursor.execute("DELETE FROM PatientCred WHERE PatientID = %s" , params)
        db.commit()
    elif table == 'PatientsAllergy': # delete from table PatientsAllergy
        cursor.execute("DELETE FROM PatientsAllergy WHERE PatientID = %s AND AllergyType= %s", params)
        db.commit()
    elif table == 'LabRecord': # delete from table LabRecord
        cursor.execute("DELETE FROM LabRecord WHERE LabRecordID = %s AND PatientID = %s", params)
        db.commit()


class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')  # Allow POST requests
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')  # Allow Content-Type header
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)
    
    def do_GET(self): # Implement GET method to view all/one patient(s) 
        if self.path == "/patients":#  get all patients
            all_patients = getAllPatients()
            self._set_headers()
            self.wfile.write(json.dumps(all_patients).encode())

        elif self.path == "/patientCreds": # get all username and password
            patientCreds = getPatientsCreds()
            self._set_headers()
            self.wfile.write(json.dumps(patientCreds).encode())

        elif self.path == "/records":# get all records
            patientCreds = getAllRecords()
            self._set_headers()
            self.wfile.write(json.dumps(patientCreds).encode())

        elif self.path == "/allergies": # get all allergies
            patientCreds = getAllAllergies()
            self._set_headers()
            self.wfile.write(json.dumps(patientCreds).encode())

        elif self.path == "/patient": #  get one patient by id
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                record = getPatientByID((patient['PatientID'],))

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}
                self.wfile.write(json.dumps(response_data).encode())

            self._set_headers()
            self.wfile.write(json.dumps(record).encode())

        elif self.path == "/record": #  get all records for a specifc patient by id
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                record = getAllRecordsByID((patient['PatientID'],))

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}
                self.wfile.write(json.dumps(response_data).encode())

            self._set_headers()
            self.wfile.write(json.dumps(record).encode())

        elif self.path == "/allergy": #  get all allergies for a specifc patient by id
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                record = getAllAllergiesByID((patient['PatientID'],))

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}
                self.wfile.write(json.dumps(response_data).encode())

            self._set_headers()
            self.wfile.write(json.dumps(record).encode())

        else:
            self._set_headers(404)
  
    def do_POST(self): # Implement POST method to add new patients
        
        if self.path == "/registration":# insert a new patient into the system from registration form
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                rowExist = getPatientIDByClinicNum((patient['ClinicNumber'],))
                if rowExist:
                    response_data = {'success': False, 'message': 'ID is already used'}
                else:
                    insertPatientInfo('patients', (patient['ClinicNumber'], patient['Birthday'], patient['FirstName'], patient['Surname'], patient['Email']))
                    patientID = getPatientIDByClinicNum((patient['ClinicNumber'],))
                    insertPatientInfo('PatientCred', (patientID[0], patient['Username'], patient['patientPassword']))
                    response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/record": # insert a new lab record for specific patient
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                insertPatientInfo('LabRecord', (patient['PatientID'], patient['RecordsDesc']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/allergy": # insert a new allergy for specific patient
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                insertPatientInfo('PatientsAllergy', (patient['PatientID'], patient['AllergyType'], patient['PatientAllergyDesc']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())
        
        else:
            self._set_headers(404)

    def do_PUT(self):# Implement PUT method to update a patients
        if self.path == "/patient":
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                updatePatientInfo('patients', (patient['PatientID'], patient['Birthday'], patient['FirstName'], patient['Surname'], patient['Email']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/patientCred":
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                updatePatientInfo('PatientCred', (patient['PatientID'], str(patient['Username']), str(patient['patientPassword'])))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/record":
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                updatePatientInfo('LabRecord', (patient['LabRecordID'], patient['PatientID'], patient['RecordsDesc']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/allergy":
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                updatePatientInfo('PatientsAllergy', (patient['PatientID'], patient['PatientsAllergyID'], patient['AllergyType'], patient['PatientAllergyDesc']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())
        else:
            self._set_headers(404)

    def do_DELETE(self): # Implement DELETE method to delete a patients

        if self.path == "/patient": # delete a patient from database, deleting the patient from the table will remove all records of patient
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                deletePatientInfo('patients', (patient['PatientID'],))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/record": # delete a record for patient
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                deletePatientInfo('LabRecord', (patient['LabRecordID'], patient['PatientID']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())

        elif self.path == "/allergy": # delete a allergy for patient
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))

            try:
                deletePatientInfo('PatientsAllergy', (patient['PatientID'], patient['AllergyType']))
                response_data = {'success' : True}

            except Exception as e:
                response_data = {'success': False, 'error': str(e)}

            self._set_headers()
            self.wfile.write(json.dumps(response_data).encode())
        else:
            self._set_headers(404)

def run(serverClass=HTTPServer, handlerClass=RequestHandler, port=8080):
    serverAddress = ('', port)
    httpd = serverClass(serverAddress, handlerClass)
    print(f'Starting httpd server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()