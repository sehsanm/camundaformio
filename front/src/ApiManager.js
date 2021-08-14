import axios from "axios" 


let exp =  {
    getProcesses : () => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/processes')        
    }, 
    getProcessDetails : (processName) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName)        
    }, 
    getForm : (processName , formName) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/processes/' + processName + '/forms/'  + formName)        
    }, 
    updateForm : (processName, formName , form) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/processes/' + processName + '/forms/' + formName , form , {headers: {'Content-Type' : "application/json"}})        
    }, 

    submitForm : ( taskId , data) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/task/' + taskId , data , {headers: {'Content-Type' : "application/json"}})        
    }, 

    startProcess : ( processKey , data) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/process/' + processKey , data , {headers: {'Content-Type' : "application/json"}})        
    }, 
}

export default exp ; 