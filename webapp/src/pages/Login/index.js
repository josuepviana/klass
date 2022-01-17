import useAxios from 'axios-hooks';
import React, { useEffect, useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { UsuarioContext } from '../../auth/usuario-context';
import Loading from '../../assets/loading-circle.gif'
import './login.css';

function Login() {

  const history = useHistory();
  const { setUsuario } = useContext(UsuarioContext);

  // Prepara a requisição de login
  const [{ data: loginResponse, loading, error }, executeLogin] = useAxios({
    url: 'http://localhost:3000/auth/login',
    method: 'POST'
  }, { manual: true });


  const [{ data: profile }, getProfile] = useAxios({
    url: "http://localhost:3000/profile"
  }, { manual: true});


  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    executeLogin({ data: details });

    return false;
  };

  const goToSignUp = () => {
    history.push('/signup');

    return false;
  }

  useEffect(() => {
    if (loginResponse) {
      localStorage.setItem('api-token', loginResponse.access_token);

      getProfile({
        headers: {
          Authorization: "Bearer " + loginResponse.access_token,
        }
      })
    }
  }, [loginResponse, history]);

  useEffect(() => {
    if (profile) {

      setUsuario(profile);
      
      history.push('/home');
    }
  }, [profile, history]);


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
                  <button disabled={loading} type="button" onClick={goToSignUp}>Cadastrar</button>
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
