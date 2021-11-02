import useAxios from "axios-hooks";
import React from "react";
import "./sidenav.css";

import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";

function Sidenav() {
  const history = useHistory();

  const doLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const [{ data, loading, error }] = useAxios({
    url: "http://localhost:3000/profile",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("api-token"),
    },
  });

  return (
    <Router>
      {data && (
        <nav class="menu" tabindex="0">
          <header class="avatar">
            <img
              src={"http://localhost:3001/img/" + data.avatar}
              alt="loading..."
            />
            <h2>{data.nome}</h2>
          </header>
          <ul>
            <li tabIndex="0">
              <Link to="/">Home</Link>
            </li>
            <li tabIndex="1">
              <Link to="/profile">Perfil</Link>
            </li>
            <li tabIndex="2">
              <Link to="/notifications">Notificações</Link>
            </li>
            <li tabIndex="3">
              <Link to="/configurations">Configurações</Link>
            </li>
            <li tabIndex="4" className="logout">
              <button onClick={doLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </Router>
  );
}

export default Sidenav;
