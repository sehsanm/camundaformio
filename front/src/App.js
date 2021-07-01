import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from "./Navbar" ; 
import FormList from "./FormList" ; 
import FormEdit from "./FormEdit" ; 
import FormSubmit from './FormSubmit';

function App() {
  return (
    <Router> 
        <Navbar />
        <Switch>
        <Route path="/forms/:folderName/:formName/edit">
            <FormEdit />
        </Route>
        <Route path="/forms/:folderName/:formName">
            <FormSubmit />
        </Route>
        <Route path="/">
            <FormList />
        </Route>

        </Switch>
    </Router>
  )
}

export default App;
