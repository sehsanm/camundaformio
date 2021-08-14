import React  from "react";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import {FormBuilder} from '@formio/react';

import ApiManager from './ApiManager' ; 

function FormEdit() {
    const [form , setForm] = useState([]) ; 
    const { processName , formName } = useParams();
    useEffect(() => {
        ApiManager.getForm(processName, formName).then(form => {
            let finalForm = form.data
            if (finalForm.components == undefined) {
                //A bug in form Editor 
                finalForm = {components : []} ;
            }

            setForm(finalForm)
        }) ;
    }, []) ; 

    const submitForm = (e) => {
        ApiManager.updateForm(processName, formName, form).catch(alert) ; 
        e.preventDefault() ; 
    }

    return (
    <div>
        <FormBuilder form={{...form , display: 'form'}} onChange={(schema) => console.log(schema)} /> 
        <button type="button" class="btn btn-danger"  onClick={submitForm}>Save Form on Server</button>
    </div>
    ); 
}; 
export default FormEdit ; 