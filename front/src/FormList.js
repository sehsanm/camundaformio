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
        <ul>
            {forms.map( el =><li> <Link key={el.name}  to={"/forms/" + el.name}>  {el.name} </Link> </li>)}
        </ul>    
    )
     
}