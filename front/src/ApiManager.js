import axios from "axios" 


export default {
    getForms : () => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/forms')        
    }, 
    getForm : (formName) => {
        return axios.get(process.env.REACT_APP_BACKEND_URL + '/forms/' + formName)        
    }, 
    updateForm : (formName , form) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/forms/' + formName , form , {headers: {'Content-Type' : "application/json"}})        
    }, 

    submitForm : ( taskId , data) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/task/' + taskId , data , {headers: {'Content-Type' : "application/json"}})        
    }, 

    startProcess : ( processKey , data) => {
        return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/process/' + processKey , data , {headers: {'Content-Type' : "application/json"}})        
    }, 
}