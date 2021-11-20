import useAxios from "axios-hooks";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
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
            <FontAwesomeIcon icon={ faHome }/> &nbsp;<Link to="/">Home</Link>
            </li>
            <li tabIndex="1">
            <FontAwesomeIcon icon={ faUser }/> &nbsp;<Link to="/profile">Perfil</Link>
            </li>
            <li tabIndex="2">
            <FontAwesomeIcon icon={ faBell }/> &nbsp;<Link to="/notifications">Notificações</Link>
            </li>
            <li tabIndex="3">
            <FontAwesomeIcon icon={ faCogs }/> &nbsp;<Link to="/configurations">Configurações</Link>
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
