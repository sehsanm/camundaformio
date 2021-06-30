import React  from "react";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import {FormBuilder} from '@formio/react';

import ApiManager from './ApiManager' ; 

function FormEdit() {
    const [form , setForm] = useState([]) ; 
    const { formName } = useParams();
    useEffect(() => {
        ApiManager.getForm(formName).then(form => setForm(form.data)) ;
    }, []) ; 

    const submitForm = (e) => {
        ApiManager.updateForm(formName , form) ; 
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