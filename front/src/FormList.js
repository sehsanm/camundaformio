import React  from "react";
import { useEffect , useState} from "react";
import ApiManager from './ApiManager' ; 
import {Link} from 'react-router-dom' ; 

export default  function() {

    const [forms , setForms] = useState([]) ; 
    
    useEffect(() => {
        ApiManager.getForms().then(forms => setForms(forms.data)) ;
    }, []) ; 
    console.log(forms) ;
    return (
        <ul class="list-group">
            {forms.map( el =><li class="list-group-item"> <Link key={el.name}  to={"/forms/" + el.folder  + '/' + el.file}> {el.folder}  -  {el.file} </Link> </li>)}
        </ul>    
    )
     
}