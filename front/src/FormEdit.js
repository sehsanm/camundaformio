import React  from "react";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import {FormBuilder} from '@formio/react';

import ApiManager from './ApiManager' ; 

function FormEdit() {
    const [form , setForm] = useState([]) ; 
    const { formName , folderName } = useParams();
    useEffect(() => {
        ApiManager.getForm(folderName + '/' + formName).then(form => setForm(form.data)) ;
        window.addEventListener('unhandledrejection', function (event) {
            //A bug in FormIO builder component: 
            //https://github.com/formio/formio.js/issues/4048
            console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
            event.preventDefault();
          });
    }, []) ; 

    const submitForm = (e) => {
        ApiManager.updateForm(folderName + '/' + formName , form) ; 
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