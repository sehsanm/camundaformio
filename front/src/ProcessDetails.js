import React  from "react";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";

import ApiManager from './ApiManager' ; 
import {Link} from 'react-router-dom' ; 

function ProcessDetails() {

    const [process , setProcess] = useState({forms:[]}) ; 
    const { processName } = useParams();

    useEffect(() => {
        ApiManager.getProcessDetails(processName).then(forms => setProcess(forms.data)) ;
    }, []) ; 
    console.log(process) ;
    return (
        <div>
            <h1>Process Details:</h1>
            <h2>Forms: </h2>
            <ul class="list-group">
                {process.forms.map( el =><li class="list-group-item"> <Link key={el.name}  to={"/processes/" + processName  + '/forms/' + el.file + '/edit'}>  {el.file} </Link> </li>)}
            </ul>
        </div>    
    )
     
}

export default ProcessDetails ; 