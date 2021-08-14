import React  from "react";
import { useEffect , useState} from "react";
import ApiManager from './ApiManager' ; 
import {Link} from 'react-router-dom' ; 

export default  function() {

    const [processes , setProcesses] = useState([]) ; 
    
    useEffect(() => {
        ApiManager.getProcesses().then(forms => setProcesses(forms.data)) ;
    }, []) ; 
    console.log(processes) ;
    return (
        <div>
            <h2>List of current Processes: </h2>
            <ul class="list-group">
                {processes.map( el =><li class="list-group-item"> <Link key={el.process}  to={"/processes/" + el.process}> {el.process} </Link> </li>)}
            </ul>
        </div>    
    ) ; 
    
     
}