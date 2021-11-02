import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login'
import Home from "./pages/Home";
import './App.css';
import Sidenav from "./components/menu/sidenav";


function App() {

  return (
    <div className="App">
      <main>
        <Router>
        <Sidenav />
          <Switch>
            <Route path="/" exact={true}>
              <Login />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
