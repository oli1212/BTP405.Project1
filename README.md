# **Project 1** #

To try this PHR System, You have to try all the given endpoints which are GET, POST, PUT, and DELETE requests:

1. First you have to clone my repository in VS code.
2. With docker installed in your computer, you run the command in the root directroy
    "docker-compose up"
3. Now to run the server using python
    i. run "cd python" to change directories
    ii. run "py server.py" to run the server
   
* To try GET: **curl http://localhost:8080/patients**

* To try POST:**curl -X POST -H "Content-Type: application/json" -d '{"PatientID": "1", "RecordsDesc": "sample"}' http://localhost:8080/record**

* To try PUT:**curl -X PUT -H "Content-Type: application/json" -d '{"PatientID": "1", "LabRecordID": "1", "RecordsDesc": "sample"}' http://localhost:8080/record**

* To try DELETE:**curl -X DELETE -H "Content-Type: application/json" -d '{"PatientID": "1"}' http://localhost:8080/patient**

I used Jira, for my scrum, sprints, used case, and acceptance criteria:
https://akeshavarzi.atlassian.net/jira/software/projects/PHRPS/boards/5/backlog?assignee=712020%3A47a6393c-ee0c-460e-b223-728adff8ebea&atlOrigin=eyJpIjoiMTIxMDc3MDA5MWY3NDZjZGJlZjlhYTBmOTJmY2Q3NmMiLCJwIjoiaiJ9

Secure Cloud-Based Personal Health Record (PHR) System 
Project Overview: 
Develop a secure, cloud-based Personal Health Record (PHR) system that allows users to manage their health information in one place. The system should enable users to add, view, and share their health data with healthcare providers securely. This project will incorporate agile methodologies, focus on user needs through personas and user stories, employ a microservices architecture for scalability and maintenance, and emphasize security and privacy in all aspects of the application. The programming language chosen for the project should be Python, like all other activities we did together. User interface and client app (iOS/Android) is not required for project one (this project). You have to create a Git repository (Github is preferred) to track the changes in the code base. The documentation mentioned in the deliverable section should be a PDF you will submit through the BlackBoard system. Also, you should add the same documentation to your Git Readme. No web-based third-party library is allowed; you have to use the built-in HTTP package in Python. 
Objectives: 
•	Product Vision and Management (Chapter 1):  
Define the vision of the PHR system to empower users with control over their health data. Manage the product development lifecycle using agile methodologies. 

•	Agile Software Engineering (Chapter 2):  
Implement the project using Scrum, with sprints to iteratively develop features based on prioritized user stories and scenarios. 
•	User-Centered Design (Chapter 3):  
Develop personas representing the system's end-users (patients, doctors, health administrators) and create scenarios and user stories to guide feature development. 

USE CASES:

1.	Register Patient
a.	Actor: New Patient
b.	Goal: Create a new account in the PHR system
c.	Acceptance criteria:
i.	User able to navigate to registration page
ii.	User inputs their Clinic Number, name, surname, email, birthday, username and password. If they don’t have a Clinic Number, they also enter their demographic information such as age, race, ethnicity and gender
iii.	User submits registration form
iv.	System will validate the patient’s information and update it to existing information in the system or create a new entry with the information given
v.	The system sends a confirmation email to the patient
vi.	Patient verifies their email and completes the registration.

2.	Login Patient
a.	Actor: Registered Patient
b.	Goal: Login to PHR system to get health records 
c.	Acceptance criteria:
i.	Patient able to navigate to login page
ii.	Patient inputs their username and password
iii.	Patient logs in after submitting form
iv.	The system will verify the user’s inputs and authenticate the user
v.	The system will redirect the user to the dashboard

3.	Add Health Record
a.	Actor: Registered Patient
b.	Goal: Add an existing health record to PHR system for logged in patient
c.	Acceptance criteria:
i.	Patient able to navigate to the “Add Health Record” section.
ii.	Patient inputs health information, diagnosis, medication, treatment and lab results
iii.	Patient submits the form
iv.	System will save new record to the patient’s profile
v.	System displays confirmation message to patient

4.	Share Health Record
a.	Actor: Registered Patient
b.	Goal: Share an existing health record on PHR system for logged in patient
c.	Acceptance criteria:
i.	Patient able to navigate to the “Share Health Record” section.
ii.	Patient chooses the record they want to share
iii.	Patient enters email for the recipient, patient can give access permission to recipient
iv.	Patient can submit the share request
v.	System sends a notification to recipient
vi.	Recipient can access the record


5.	View Health Record
a.	Actor: Registered Patient
b.	Goal: View an existing health record on the PHR system for logged in patient
c.	Acceptance criteria:
i.	Patient able to navigate to the “View Health Record” section.
ii.	Patient given a list of their health records
iii.	Patient chooses which record they want to view
iv.	System gets the record and displays the record details
v.	Patient can view the details for the report

6.	Create Health insights
a.	Actor: Registered Patient
b.	Goal: Personalized health insights are created and recommended to the patient based on the health data given
c.	Acceptance criteria:
i.	Patient able to navigate to the “Health Insights” section.
ii.	Patient can choose the type of insights they want to generate (e.g. Risk prediction, Treatment recommendations, dietary guidance, exercise plans, medication management, chronic disease management)
iii.	The system will analyze user’s health data with machine learning algorithms
iv.	System creates personalized heath insights and recommendation 
v.	Patients can review the insights created and act upon the recommendations

Change to own words.

•	Software Architecture (Chapter 4):  
Design the system's architecture with emphasis on security, scalability, and interoperability. Consider cloud-based services and virtualization as core components of the architecture. 
•	Cloud-Based Software Engineering (Chapter 5):  
Leverage cloud services for hosting, data storage, and scalability. Utilize virtualization and containers for deployment and isolation of microservices. 
•	Microservices Architecture (Chapter 6):  
Structure the application as a collection of loosely coupled services that implement specific business functions. Employ RESTful services for communication between microservices. 

•	Security and Privacy (Chapter 7):  
Implement comprehensive security measures, including authentication, authorization, encryption, and privacy-preserving features. Ensure the system is resilient against common attacks and protects users' sensitive health information.
Deliverables: 
•	PHR System Implementation: A fully functional cloud-based PHR system accessible via APIs. 
•	Documentation: Detailed documentation covering system architecture, design decisions, agile process, user stories, All the APIs (like API call examples), and security measures. 
•	Testing Suite: A suite of automated tests for functional and non-functional requirements, including security penetration tests. 
•	User Guide: A guide for end-users on how to use the system effectively. 
•	Project Report: A comprehensive report detailing the development process, lessons learned, and future work. 
Advanced Features: 
•	Integration with healthcare provider systems for real-time data sharing. 
•	Machine learning algorithms to provide personalized health insights and recommendations. 
•	Blockchain for secure and immutable health records management. 
•	Add a front-end framework for your project like ReactJS/ VueJS. 

login and registration information needed: (if patient already has record within the system, creating an account will connect to the already existing data)
1.	Clinic number (should already be in the system) required during registration
2.	Email (retype) (not in the system, will be in the system when registered)
3.	First name (should already be in the system)
4.	Surname (should already be in the system)
5.	Birthday (should already be in the system)
6.	Username (used for future login, created during registration)
7.	Password (used for future login, created during registration)


Once logged in as user:
-	Able to access their own medical records
-	Add new medical records
-	Able to send records to health care provider securely 
-	View health insights
