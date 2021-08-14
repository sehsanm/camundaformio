
const fs = require('fs') ; 
const { Client, logger } = require("./camsdk");
const formioUtil = require("./formioUtils") ; 
const FORMS_DIR = process.env.FORMS_DIR ; 
const CAMUNDA_SERVER =  process.env.CAMUNDA_SERVER ; 
const SERVER_BASE_URL =  process.env.SERVER_BASE_URL ; 
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
            var p = fs.promises.readdir(FORMS_DIR + '/' + folder )
            promises.push(p.then(files =>  files.forEach(file => ret.push({folder: folder , file: file})) )) ; 
        });
        return Promise.all(promises) ; 
    }).then(()=> res.send(ret.sort((a,b) => {
      var av = a.folder + a.file ; 
      var bv = a.folder + a.file ; 
      if (av > bv)
        return 1 ; 
      if (bv > av)
        return -1 ; 
      return 0 ;
    })) );  
}

module.exports.updateForm = function (req, res) {
    fs.promises.writeFile(FORMS_DIR +'/' + req.params.folderName + '/' + req.params.formName, JSON.stringify(req.body, null , 4))
    .then(()=> {
        console.log('File Updated:' , FORMS_DIR +'/' + req.params.folderName + '/' + req.params.formName)
        res.send({file: req.params.formName , folder : req.params.folderName})
    }) ;     
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