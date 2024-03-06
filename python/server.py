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

class RequestHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()

    # Implement GET method to view all/one patient(s)
    def do_GET(self):
        if self.path == "/patients":
            cursor.execute("SELECT * FROM patients")
            all_patients = cursor.fetchall()
            self._set_headers()
            self.wfile.write(json.dumps(all_patients).encode())
        elif self.path.startswith("/patient"):
            patient_id = self.path.strip("/").split("/")[-1]
            cursor.execute("SELECT * FROM patients WHERE PatientID = %s", (patient_id,))
            patient = cursor.fetchone()

            if patient:    
                self._set_headers()
                self.wfile.write(json.dumps(patient).encode())
            else:
                self._set_headers(404)
        else:
            self._set_headers(404)

    # Implement POST method to add new patients
    def do_POST(self):
        if self.path == "/patients":
            get_content_length = int(self.headers['Content-Length'])
            patient = json.loads(self.rfile.read(get_content_length))
            
            cursor.execute("INSERT INTO patients (FirstName, Surname) VALUES (%s, %s)", (patient['FirstName'], patient['Surname']))
            db.commit()
            self._set_headers(201)
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
        else:
            self._set_headers(404)

    # Implement DELETE method to delete a patient
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