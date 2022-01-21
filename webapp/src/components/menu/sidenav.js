import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs, faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "./sidenav.css";

import { BrowserRouter as Router, useHistory, Link } from "react-router-dom";
import { UsuarioContext } from "../../auth/usuario-context";

function Sidenav() {
  const history = useHistory();

  const { usuario } = useContext(UsuarioContext);

  if (!usuario) {
    history.push('/')
  }

  const doLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  const goToProfile = () => {
    history.push("/profile");
  };

  const goToHome = () => {
    history.push("/home");
  };

  const goToFaculdade = () => {
    history.push("/faculdade");
  };

  const goToCurso = () => {
    history.push("/curso");
  };

  return (
    <Router>
      <nav class="menu" tabIndex="0">
        <header class="avatar">
          <img
            src={usuario.avatar}
            alt="loading..."
          />
          <h2>{usuario.nome}</h2>
        </header>
        <ul>
          <li tabIndex="0">
            <FontAwesomeIcon icon={faHome} /> &nbsp;<button onClick={goToHome}>Home</button>
          </li>
          <li tabIndex="1">
            <FontAwesomeIcon icon={faUser} /> &nbsp;<button onClick={goToProfile}>Perfil</button>
          </li>
          <li tabIndex="4">
            <FontAwesomeIcon icon={faCogs} /> &nbsp;<Link to="/configurations">Configurações</Link>
          </li>
          <li tabIndex="5" className="logout">
            <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;<button onClick={doLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </Router>
  );
}

export default Sidenav;
