import React  from "react";
import { useEffect , useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import { Form } from '@formio/react';

import ApiManager from './ApiManager' ; 
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function FormSubmit() {
    const {processName, formName} = useParams();
    let query = useQuery();

    const [form , setForm] = useState([]) ; 
    const [history, setHistory] = useState([]); 
    const [submission , setSubmission] = useState({}) ; 
    useEffect(() => {
        ApiManager.getForm(processName , formName ).then(form => setForm(form.data)) ;
        ApiManager.getFormHistory(processName, formName).then(h => {
            console.log(h.data); 
            setHistory(h.data);
        }); 
    }, []) ; 
    
    const submitData = (data , addToHistory = true) => {

        
        console.log('Test!' , data) ; 
        console.log('AddtoHistory:' , addToHistory);
        if (query.get("taskId")) {
            ApiManager.submitForm(processName, formName , query.get("taskId") , data, addToHistory).then(() => window.location = query.get("callbackUrl")) ;
        } else {
            ApiManager.startProcess(processName, formName , query.get("processDefinitionKey") , data , addToHistory).then(() => window.location = query.get("callbackUrl")) ;

        }
        
    }

    const submitHistory = (ind) => {
        var data = history[ind] ; 
        submitData({data : data}   , false) ; 
    }

    const submitForm = () => {
        submitData(submission.data, true) ; 
    }

    return (
            <div style={{width: "80%" , textAlign:"center"}} >
                <h2>History</h2>
                {
                    history.map((h,i) => <span key={i} class="badge bg-primary"  onClick={() => submitHistory(i)}>{i}</span>)
                }
                <hr/>
                <Form form={form}  onChange={setSubmission} /> 

                <button disabled={!submission || !submission.isValid} type="button" class="btn btn-primary"  onClick={submitForm}>Submit</button>

            </div>
    );    

}

export default FormSubmit ; 
