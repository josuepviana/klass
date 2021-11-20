import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login'
import Home from "./pages/Home";
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
