use Hospital;

CREATE TABLE patients(
    PatientID int not null AUTO_INCREMENT,
    FirstName VARCHAR(100) NOT NULL,
    Surname VARCHAR(100) NOT NULL,
    PRIMARY KEY (PatientID)
);

INSERT INTO patients(FirstName, Surname)
VALUES("John", "Anderson"), ("Emma", "Smith"), ("Oscar", "Li"), ("John", "Shi"), ("Jacky", "Li"), ("DoubleUTF", "Li");