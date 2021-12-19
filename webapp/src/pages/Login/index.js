import useAxios from 'axios-hooks';
import Loading from '../../assets/loading-circle.gif'
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import './login.css';


function Login() {

  const history = useHistory();

  // Prepara a requisição de login
  const [{ data, loading, error }, executeLogin] = useAxios({
    url: 'http://localhost:3000/auth/login', // AppController.ts
    method: 'POST'
  }, { manual: true });

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    executeLogin({ data: details });

    return false;
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('api-token', data.access_token);
      history.push('/home');
    }
  }, [data, history]);

  return (
    <div className="login--layout">
      <form onSubmit={handleSubmit}>
        <div className="form-inner">
          {loading && <img src={Loading} alt="loading..." width="60" height="60" />}
          {!loading &&
            <div>
              <h2>Entrar</h2>
              {error != "" ? <div className="error">{error}</div> : ""}

              <h1 className="klass-title">klass</h1>
              <div className="inner-form">
                <div className="form-group">
                  <label> Usuário </label>
                  <input
                    placeholder="Username"
                    name="username"
                    id="username"
                    onChange={(e) =>
                      setDetails({ ...details, username: e.target.value })
                    }
                    value={details.username}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label> Senha </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    id="password"
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                    value={details.password}
                    disabled={loading}
                  />
                </div>

                <div className="form-group buttons">
                  <button type="submit" disabled={loading}>Login</button>
                  <button disabled={loading}>Cadastrar</button>
                </div>
              </div>
            </div>
          }

        </div>
      </form>
    </div>
  );
}
export default Login;
