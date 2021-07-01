# Purpose of this project 
This project is a development tool to integrate Camunda and Form.io .  It has two aspects: 

* Develop forms of FormIO 
* Allow integration of Tasklist App  to developed forms 

All purpose of the application is to allow quick development of the processes with camnunda app. 

## Setup Dev Environment 

### Camunda 
Run local version of the camunda: https://camunda.com/download/ 

Username and password is demo/demo 

Address is http://localhost:8080 
### Run Backend
goto back folder 

run `yarn start-dev`

It will listen on port 5000 


The json files are located inside the `back/forms` folder. Inside there we should have folder (for each process) and then some json files.  
### Run Front End  

`cd back` 

`yarn start` 

It will run server on  port 3000 

## Camunda Modeller 

In modeller in order to allow integration with tasklist application  you can specify following Form Key for the form. This will force the  Tasklist application to open form in our fontend application   http://localhost:3000/forms/:folderName/:formName.json  

