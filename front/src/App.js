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
        <Route path="/forms/:folderName/:formName.html">
            <FormSubmit />
        </Route>
        <Route path="/forms/:folderName/:formName">
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
