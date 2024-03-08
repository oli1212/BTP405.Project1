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

# get all patient query
def getAllPatients():
    cursor.execute("SELECT * FROM patients")
    return cursor.fetchall()

def getPatientsCreds():
    cursor.execute("SELECT * FROM PatientCred")
    return cursor.fetchall()

def getPatientByID(params):
    cursor.execute("SELECT * FROM patients WHERE PatientID = %s", params)
    return cursor.fetchone()

def getPatientIDByClinicNum(params):
    cursor.execute("SELECT * FROM patients WHERE ClinicNumber = %s", params)
    return cursor.fetchone()

def insertPatientInfo(table, params):
    if table == 'patients':
        cursor.execute("INSERT INTO patients (ClinicNumber, Birthday, FirstName, Surname, Email) VALUES (%s, %s, %s, %s, %s)", params)
        db.commit()
    elif table == 'PatientCred':
        cursor.execute("INSERT INTO PatientCred (PatientID, Username, patientPassword) VALUES (%s, %s, %s)", params)
        db.commit()
    elif table == 'PatientsAllergy':
        cursor.execute("INSERT INTO PatientsAllergy (PatientID, AllergyType, PatientAllergyDesc) VALUES (%s, %s, %s)", params)
        db.commit()
    elif table == 'LabRecord':
        cursor.execute("INSERT INTO LabRecord (PatientID, Username, patientPassword) VALUES (%s, %s, %s)", params)
        db.commit()

def deletePatientInfo(table, params):
    if table == 'patients':
        cursor.execute("DELETE FROM patients WHERE ClinicNumber = %s", params)
        db.commit()
    elif table == 'PatientCred':
        cursor.execute("DELETE FROM PatientCred WHERE ClinicNumber = %s", params)
        db.commit()
    elif table == 'PatientsAllergy':
        cursor.execute("DELETE FROM PatientsAllergy WHERE ClinicNumber = %s", params)
        db.commit()
    elif table == 'LabRecord':
        cursor.execute("DELETE FROM LabRecord WHERE ClinicNumber = %s", params)
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

    # Implement GET method to view all/one patient(s)
    def do_GET(self):
        #  get all patients
        if self.path == "/patients":
            all_patients = getAllPatients()
            self._set_headers()
            self.wfile.write(json.dumps(all_patients).encode())
        #  get one patient
                        
        elif self.path == "/patientCreds":
            patientCreds = getPatientsCreds()
            self._set_headers()
            self.wfile.write(json.dumps(patientCreds).encode())
            
        elif self.path.startswith("/patient"):
            patient_id = self.path.strip("/").split("/")[-1]
            patient = getPatientByID((patient_id,))

            if patient:    
                self._set_headers()
                self.wfile.write(json.dumps(patient).encode())
            else:
                self._set_headers(404)
        else:
            self._set_headers(404)

    # Implement POST method to add new patients
    def do_POST(self):
        # insert 
        if self.path == "/registration":
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
        else:
            self._set_headers(404)

    # Implement PUT method to update a patients
    def do_PUT(self):
        if self.path.startswith("/patient"):
            patient_id = self.path.strip("/").split("/")[-1]
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))
            cursor.execute("UPDATE patients SET FirstName = %s, Surname = %s WHERE PatientID = %s", (patient['FirstName'], patient['Surname'], patient_id,))
            db.commit()
            self._set_headers()
        elif self.path.startswith("/login"):
            patient_id = self.path.strip("/").split("/")[-1]
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))
            cursor.execute("UPDATE PatientCred SET Username = %s, patientPassword = %s WHERE PatientID = %s", (patient['Username'], patient['patientPassword'], patient_id,))
            db.commit()
            self._set_headers()
        else:
            self._set_headers(404)

    # Implement DELETE method to delete a patients
    def do_DELETE(self):
        patient_id = self.path.strip("/").split("/")[-1]
        cursor.execute("DELETE FROM patients WHERE PatientID = %s", (patient_id,))
        db.commit()
        self._set_headers()

def run(serverClass=HTTPServer, handlerClass=RequestHandler, port=8080):
    serverAddress = ('', port)
    httpd = serverClass(serverAddress, handlerClass)
    print(f'Starting httpd server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()