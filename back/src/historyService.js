const PROCESSES_DIR = process.env.PROCESSES_DIR ; 
 
const fs = require('fs') ; 

let history = {} 


module.exports.getHistory = function (processName , formName) {
    if (history[processName] == undefined)
        return [] ; 
    else if (history[processName][formName] == undefined)
        return [] ; 
    return history[processName][formName] ;  
}

module.exports.addHistory = function (processName, formName, data) { 
    if (history[processName] == undefined )
        history[processName] = {} ; 
    if (history[processName][formName] == undefined)
        history[processName][formName] = [] ; 

    history[processName][formName].push(data) ; 
}

module.exports.saveHistory = function(processName) {
    var promises = [] ; 
    if (history.hasOwnProperty(processName)){
        for (var p in history[processName]) {
            if (history[processName].hasOwnProperty(p)) {
                promises.push(fs.promises.writeFile(PROCESSES_DIR +'/' + processName + '/history/' + p , JSON.stringify(history[processName][p], null , 4))
                .then((v)=> {
                    console.log('History Saved:' , PROCESSES_DIR +'/' + processName + '/history/' + p , JSON.stringify(history[processName][p], null , 4));
                    return v ;
                })) ;     
            
            }
        }
    }
    return Promise.all(promises) ; 
}


module.exports.loadHistory = function(processName) {
    var d = PROCESSES_DIR + '/' + processName + '/history' ; 
    return fs.promises.readdir(d).then(files => {
        if (history[processName] == undefined){
            history[processName]= {} ; 
        }
        files.forEach(f => history[processName][f] = JSON.parse(fs.readFileSync(d + '/' + f))); 
        
    }); 

}
