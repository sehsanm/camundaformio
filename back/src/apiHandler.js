
const fs = require('fs') ; 
const { Client, logger } = require("./camsdk");
const formioUtil = require("./formioUtils") ; 
const historyService = require("./historyService"); 
const PROCESSES_DIR = process.env.PROCESSES_DIR ; 
const CAMUNDA_SERVER =  process.env.CAMUNDA_SERVER ; 
const SERVER_BASE_URL =  process.env.SERVER_BASE_URL ; 
let  camClient = new Client({
    mock: false,
    apiUri: CAMUNDA_SERVER
  });

let  taskService = new camClient.resource('task');
let  processDefinitionService = new camClient.resource('process-definition');



module.exports.listProcesses = function(req, res){

  fs.promises.readdir(PROCESSES_DIR).then(folders => {
    return folders.map((f) => {
      return {process: f} 
    }) ;    
  }).then((ret) => res.send(ret))

}
 
module.exports.processDetails = function (req, res) {
    fs.promises.readdir(PROCESSES_DIR + '/' + req.params.processName + '/forms').then(folders => {
        promises = [] ;
        return folders.map(f => {
          return {folder: '/' +  PROCESSES_DIR + '/' + req.params.processName + '/forms' , file: f } 
        });
    }).then((ret) => res.send({forms: ret}) );  
}

module.exports.saveHistory = function(req, res) {
  historyService.saveHistory(req.params.processName).then(() => res.send("Saved!")) ;  
}

module.exports.loadHistory = function(req, res) {
  historyService.loadHistory(req.params.processName).then(() => res.send("Loaded!")) ;  
}

module.exports.getHistory= function(req, res) {
  res.send(historyService.getHistory(req.params.processName, req.params.formName)) ;  
}


module.exports.updateForm = function (req, res) {
    fs.promises.writeFile(PROCESSES_DIR +'/' + req.params.processName + '/forms/' + req.params.formName, JSON.stringify(req.body, null , 4))
    .then(()=> {
        console.log('File Updated:' , PROCESSES_DIR +'/' + req.params.processName + '/forms/' + req.params.formName);
        res.send({file: req.params.formName , folder : PROCESSES_DIR +'/' + req.params.processName + '/forms/'});
    }) ;     
}




module.exports.submitForm = function (req, res) {
    var data = {} ; 
    data.id = req.params.taskId ; 
    data.variables = formioUtil.convertForm( req.body.data) ; 
    console.log('Submitting form:' , data); 
    if (req.query.addToHistory == 'true') {
      historyService.addHistory(req.params.processName, req.params.formName ,  req.body.data) ; 
    }
    taskService.submitForm(data , console.log) ; 
    res.send("Task Updated!");
}

module.exports.startProcess = function (req, res) {
    var data = {} ; 
    data.key = req.params.processDefinitionKey ; 
    data.variables = formioUtil.convertForm( req.body.data) ; 
    console.log('Body Data:' , req.body.data) ;
    console.log('Submitting form:' , data); 
    console.log('Addto History ---> ' ,req.query.addToHistory   ) ; 
    if (req.query.addToHistory == 'true') {
      historyService.addHistory(req.params.processName, req.params.formName ,  req.body.data) ; 
    }
    processDefinitionService.submitForm(data , console.log) ; 

    
    res.send("Process Created");

}

module.exports.uploadFile = function(req, res) {
    /**
     * The following takes the blob uploaded to an arbitrary location with
     * a random file name and copies it to the specified file.path with the file.name.
     * Note that the file.name should come from your upload request on the client side
     * because when the file is selected it is paired with its name. The file.name is
     * not random nor is the file.path.
     */
    var tmpFile = req.files.file
    fs.readFile(tmpFile.path, function (err, data) {
      // set the correct path for the file not the temporary one from the API:
      var file = {} 
      file.path = "./tmp/" + tmpFile.name;
      file.name = tmpFile.name
      // copy the data from the req.files.file.path and paste it to file.path
      fs.writeFile(file.path, data, function (err) {
        if (err) {
          return console.warn(err);
        }
        console.log("The file: " + file.name + " was saved to " + file.path);
        res.send({
          url: SERVER_BASE_URL + '/tmp/' + file.name,
          name: tmpFile.name,
          size: tmpFile.size
        })
      });
    });
  }