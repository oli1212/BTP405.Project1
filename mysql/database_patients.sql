use Hospital;

-- Creating table to hold patient basic information
CREATE TABLE patients(
  PatientID int not null AUTO_INCREMENT,
  ClinicNumber int unsigned NOT NULL,
  Birthday varchar(100) DEFAULT NULL,
  FirstName varchar(100) DEFAULT NULL,
  Surname varchar(100) DEFAULT NULL,
  Email varchar(100) DEFAULT NULL,
  PRIMARY KEY (PatientID),
  UNIQUE KEY PatientID_UNIQUE (PatientID),
  UNIQUE KEY ClinicNumber_UNIQUE (ClinicNumber)
);

-- Insert sample data into patient table
INSERT INTO patients
(ClinicNumber,Birthday,FirstName,Surname,Email)
VALUES
(123456789,'1990-10-29','John','Anderson','JohnAnderson@gmail.com'),
(123556789, '1993-01-21','Emma','Smith','EmmaSmith@gmail.com'),
(123456389,'1998-03-18','Oscar','Li','OscarLi@gmail.com'),
(123456289,'1996-05-13','Johnny','Shi','JohnnyShi@gmail.com'),
(123456489, '2000-07-01', 'James', 'Mansor', 'JamesMansor@gmail.com');

-- Creating table to hold patient login credentials (creds will be from registration form)
CREATE TABLE PatientCred (
  PatientID int NOT NULL,
  Username varchar(100) NOT NULL,
  patientPassword varchar(100) NOT NULL,
  UNIQUE KEY Username_UNIQUE (Username),
  UNIQUE KEY PatientID_UNIQUE (PatientID),
  CONSTRAINT PatientID FOREIGN KEY (PatientID) REFERENCES patients (PatientID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- sample insert for inserting into patientcred table
insert into PatientCred (PatientID, Username, patientPassword)
VALUES
(1, 'user', 'password'),
(2, 'user1', 'password'),
(3, 'user2', 'password'),
(4, 'user3', 'password'),
(5, 'user4', 'password');


-- Creating table for patient allergies
CREATE TABLE PatientsAllergy (
  PatientsAllergyID int NOT NULL AUTO_INCREMENT,
  PatientID int NOT NULL,
  AllergyType varchar(45) NOT NULL,
  PatientAllergyDesc tinytext NOT NULL,
  PRIMARY KEY (PatientsAllergyID),
  UNIQUE KEY PatientsAllergyID_UNIQUE (PatientsAllergyID),
  KEY PatientID_idx (PatientID),
  CONSTRAINT PatientID1 FOREIGN KEY (PatientID) REFERENCES patients (PatientID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- sample data inserted into the PatientsAllergy table
INSERT INTO PatientsAllergy (PatientID, AllergyType, PatientAllergyDesc)
VALUES
(2,'Food allergies', "Patient has allergies to peanut"),
(2,'Latex allergy', "Patient showed signed of allergic react to latex condoms"),
(1,'Dust allergies', "Patient has severe allergic reaction towards dust"),
(4,'Animal Allergy', "Patient has allergies to dogs and cats")
;

-- Creating table for lab records
CREATE TABLE LabRecord (
  LabRecordID int NOT NULL AUTO_INCREMENT,
  PatientID int NOT NULL,
  RecordsDesc tinytext NOT NULL,
  PRIMARY KEY (LabRecordID),
  UNIQUE KEY LabRecordID_UNIQUE (LabRecordID),
  KEY PatientID2_idx (PatientID),
  CONSTRAINT PatientID2 FOREIGN KEY (PatientID) REFERENCES patients (PatientID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert sample data into LabRecord table
insert into LabRecord (PatientID, RecordsDesc)
VALUES 
(1, 'patient has hives, cough, and headaches'),
(2, 'patient has cough, and headaches'),
(3, 'patient has showed signs of fever'),
(4, 'patient has a cold, cough, and headaches'),
(5, 'patient has previous got covid-19');
