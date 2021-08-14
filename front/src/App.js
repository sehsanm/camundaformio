import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./Navbar" ; 
import ProcessList from "./ProcessList" ; 
import FormEdit from "./FormEdit" ; 
import FormSubmit from './FormSubmit';
import ProcessDetails from './ProcessDetails';

function App() {
  return (
    <Router> 
        <Navbar />
        <Switch>
        <Route path="/processes/:processName/forms/:formName/edit">
            <FormEdit />
        </Route>
        <Route path="/processes/:processName/forms/:formName">
            <FormSubmit />
        </Route>

        <Route path="/processes/:processName">
            <ProcessDetails />
        </Route>
        <Route path="/">
            <ProcessList />
        </Route>

        </Switch>
    </Router>
  )
}

export default App;
