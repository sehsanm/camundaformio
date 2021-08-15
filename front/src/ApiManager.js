import axios from "axios" 


let exp =  {
    getProcesses : () => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/processes')        
    }, 
    getProcessDetails : (processName) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName)        
    }, 
    saveProcessHistory : (processName) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName+ '/history/save')        
    }, 
    loadProcessHistory : (processName) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName + '/history/load')        
    }, 
    getForm : (processName , formName) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/processes/' + processName + '/forms/'  + formName)        
    }, 
    updateForm : (processName, formName , form) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName + '/forms/' + formName , form , {headers: {'Content-Type' : "application/json"}})        
    }, 
    getFormHistory : (processName, formName ) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName + '/forms/' + formName  +'/history' )        
    }, 

    submitForm : (processName, formName , taskId , data , addToHistory) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName + '/' + formName + '/task/'  + taskId + '?addToHistory=' + addToHistory , data , {headers: {'Content-Type' : "application/json"}})        
    }, 

    startProcess : (processName, formName ,  processKey , data, addToHistory) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName + '/' + formName + '/' + processKey + '/start?addToHistory=' + addToHistory, data , {headers: {'Content-Type' : "application/json"}})        
    }, 
}

export default exp ; 