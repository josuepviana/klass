/*
Usar axios-hooks para rodar o auth e exibir o token
usar 'useEffect' -> No login
*/
import React, { useState } from "react";
import useAxios from 'axios-hooks';

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    Login(details);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-inner">

        <h2> Acesse sua conta </h2>
        {error != "" ? <div className="error">{error}</div> : ""}

        <div className="inner-form">
          <div className="form-group">
            <label> E-mail </label>
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
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
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Login" />
          </div>

        </div>
      </div>
    </form>
  );
}
export default LoginForm;
