require('dotenv').config();
const express = require('express');
const { listForms, updateForm , submitForm , startProcess} = require('./apiHandler')
const PORT = process.env.PORT || 5000
const FRONT_DIR = process.env.FRONT_DIR 
const FORMS_DIR = process.env.FORMS_DIR ; 



express()
  .use(express.json({limit: '50mb'}))
  .use(express.static(FRONT_DIR))
  .use(express.json()) // for parsing application/json
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use('/forms', express.static(FORMS_DIR))
  .get('/api/forms', listForms)
  .post('/api/forms/:formName', updateForm)
  .post('/api/task/:taskId' , submitForm)
  .post('/api/process/:processDefinitionKey' , startProcess)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
