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

