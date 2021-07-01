import React  from "react";
import { useEffect , useState} from "react";
import { useParams, useLocation } from "react-router-dom";
import { Form } from '@formio/react';

import ApiManager from './ApiManager' ; 
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
function FormSubmit() {
    const {folderName, formName} = useParams();
    let query = useQuery();

    const [form , setForm] = useState([]) ; 
    useEffect(() => {
        ApiManager.getForm(folderName + '/' + formName ).then(form => setForm(form.data)) ;
    }, []) ; 
    const submitData = (data) => {
        console.log('Test!' , data) ; 
        if (query.get("taskId")) {
            ApiManager.submitForm(query.get("taskId") , data).then(() => window.location = query.get("callbackUrl")) ;
        } else {
            ApiManager.startProcess( query.get("processDefinitionKey") , data).then(() => window.location = query.get("callbackUrl")) ;

        }
        
    }
    return (
            <div style={{width: "80%" , textAlign:"center"}} >
                <Form form={form} onSubmit={submitData} /> 

            </div>
    );    

}

export default FormSubmit ; 
