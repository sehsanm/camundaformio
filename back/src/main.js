require('dotenv').config();
const express = require('express');
const multipartyMiddleware = (require('connect-multiparty'))({ uploadDir: './tmp' }); 

const {listProcesses, processDetails, updateForm , submitForm , startProcess, uploadFile} = require('./apiHandler')
const PORT = process.env.PORT || 5000
const FRONT_DIR = process.env.FRONT_DIR 
const PROCESSES_DIR = process.env.PROCESSES_DIR ; 



express()
  .use(express.json({limit: '50mb'}))
  .use(express.static(FRONT_DIR))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
  .use('/processes', express.static(PROCESSES_DIR))
  .get('/api/processes' , listProcesses)
  .get('/api/processes/:processName', processDetails)
  .post('/api/processes/:processName/forms/:formName', updateForm)
  .post('/api/task/:taskId' , submitForm)
  .post('/api/process/:processDefinitionKey' , startProcess)
  .post('/api/upload', multipartyMiddleware, uploadFile )
  .post('/api/test' , (req ,res) => {
    console.log(req.body); 
    res.send('OK'); 
  })
  .use('/tmp', express.static('./tmp'))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
 