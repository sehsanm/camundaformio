
const fs = require('fs') ; 
const { Client, logger } = require("./camsdk");
const formioUtil = require("./formioUtils") ; 
const FORMS_DIR = process.env.FORMS_DIR ; 
const CAMUNDA_SERVER =  process.env.CAMUNDA_SERVER ; 

let  camClient = new Client({
    mock: false,
    apiUri: CAMUNDA_SERVER
  });

let  taskService = new camClient.resource('task');
let  processDefinitionService = new camClient.resource('process-definition');



module.exports.updateForm = function (req, res) {
    console.log("Writing file: " + req.params.formName + " -- " + JSON.stringify(req.body) ) ; 
    fs.writeFile(FORMS_DIR +'/' + req.params.formName , JSON.stringify(req.body, null , 4) , err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
        res.send("File Updated")
    }) ;     
}

module.exports.listForms = function (req, res) {
    ret = [] ; 

    fs.readdir(FORMS_DIR, (err, files) => {
        files.forEach(file => {
            ret.push({
                name: file, 
                location:  "/forms/" + file 
            })
        });
        res.send(ret) ; 
      });    
}

module.exports.submitForm = function (req, res) {
    var data = {} ; 
    data.id = req.params.taskId ; 
    data.variables = formioUtil.convertForm( req.body.data) ; 
    console.log('Submitting form:' , data); 
    taskService.submitForm(data , () => {

    } ) ; 
    res.send("Task Updated!");
}

module.exports.startProcess = function (req, res) {
    var data = {} ; 
    data.key = req.params.processDefinitionKey ; 
    data.variables = formioUtil.convertForm( req.body.data) ; 
    console.log('Submitting form:' , data); 
    processDefinitionService.submitForm(data , console.log) ; 
    res.send("Process Created");
    
}

