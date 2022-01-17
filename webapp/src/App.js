import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './pages/Login'
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from './pages/SignUp';
import './App.css';
import { UsuarioProvider } from "./auth/usuario-context";

function App() {

  return (
    <UsuarioProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </div>
    </UsuarioProvider>
  );
}

export default App;
