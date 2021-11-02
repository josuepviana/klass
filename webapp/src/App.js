import { useState } from 'react';
import User from './User'
import LoginForm from './pages/Login'
import './App.css';

/* function randomUserId() {
  const min = 1;
  const max = 10;

  return Math.ceil(Math.random() * (max-min));
} */

function App() {

 /* const [userId, setUserId] = useState(randomUserId); */
  const [user, setUser] = useState({email: "", password:""});
  const [error, setError] = useState("");

/* const nextUser = () => {
    setUserId(randomUserId());
  } */

  const rootUser = {
    email: "root@user.com",
    password: "root"
  }

  const Login = details =>{
    console.log(details);
        setUser({
          email: details.email,
          password: details.password
        });
  }

  const Logout = () => {
    setUser({email: ""});
  }

  return (
    <div className="App">
      <main>
        {(user.email != "") ? 
          (<div>
            <h2>Bem vindo!</h2>
            <button onClick={Logout}>Sair</button>
          </div>) : 
          (<LoginForm Login={Login} error={error}/>)
        }
        {/*<User userId={userId}/>
        <button onClick={nextUser}>Recarregar</button>*/}
      </main>
    </div>
  );
}

export default App;
