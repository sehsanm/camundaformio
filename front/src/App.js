import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import FormList from "./FormList" ; 
import FormEdit from "./FormEdit" ; 
import FormSubmit from './FormSubmit';
function App() {
  return (
    <Router> 
        <Switch>
        <Route path="/forms/:formName/submit.html">
            <FormSubmit />
        </Route>
        <Route path="/forms/:formName">
            <FormEdit />
        </Route>
        <Route path="/">
            <FormList />
        </Route>

        </Switch>
    </Router>
  )
}

export default App;
