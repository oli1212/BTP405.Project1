use Hospital;

CREATE TABLE patients(
  PatientID int not null AUTO_INCREMENT,
  ClinicNumber int unsigned NOT NULL,
  Birthday date DEFAULT NULL,
  FirstName varchar(100) DEFAULT NULL,
  Surname varchar(100) DEFAULT NULL,
  Email varchar(100) DEFAULT NULL,
  PRIMARY KEY (PatientID),
  UNIQUE KEY PatientID_UNIQUE (PatientID),
  UNIQUE KEY ClinicNumber_UNIQUE (ClinicNumber)
);

INSERT INTO patients
(ClinicNumber,Birthday,FirstName,Surname,Email)
VALUES
(123456789,'1990-10-29','John','Anderson','JohnAnderson@gmail.com'),
(123556789, '1993-01-21','Emma','Smith','EmmaSmith@gmail.com'),
(123456389,'1998-03-18','Oscar','Li','OscarLi@gmail.com'),
(123456289,'1996-05-13','Johnny','Shi','JohnnyShi@gmail.com'),
(123456489, '2000-17-01', 'James', 'Mansor', 'JamesMansor@gmail.com');

