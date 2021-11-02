import useAxios from 'axios-hooks';
import Loading from '../../assets/loading-bar.gif'
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';


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
    <form onSubmit={handleSubmit}>


      <div className="form-inner">
        {loading && <img src={Loading} alt="loading..." />}
        {!loading &&
          <div>
            <h2> Acesse sua conta </h2>
            {error != "" ? <div className="error">{error}</div> : ""}

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

              <div className="form-group">
                <button type="submit" disabled={loading}>Login</button>
              </div>
            </div>
          </div>
        }

      </div>

    </form>
  );
}
export default Login;
