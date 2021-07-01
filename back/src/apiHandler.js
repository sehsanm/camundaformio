
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


module.exports.listForms = function (req, res) {
    ret = [] ; 
    fs.promises.readdir(FORMS_DIR).then(folders => {
        promises = [] ;
        folders.forEach(folder => {
            console.log('FF-->' , folder)
            var p = fs.promises.readdir(FORMS_DIR + '/' + folder )
            promises.push(p.then(files =>  files.forEach(file => ret.push({folder: folder , file: file})) )) ; 
        });
        return Promise.all(promises) ; 
    }).then(()=> res.send(ret) );  
}

module.exports.updateForm = function (req, res) {
    fs.promises.writeFile(FORMS_DIR +'/' + req.params.folderName + '/' + req.params.formName, JSON.stringify(req.body, null , 4))
    .then(()=> res.send('File Updated')) ;     
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

