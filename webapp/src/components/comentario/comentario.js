import React from "react";
import "./style.css";

function Comentario({ comentario }) {
  return (
    <div className="comentario">
      <div className="commenter--info slackey">
        <img
          src={"http://localhost:3001/img/" + comentario.usuario.avatar}
          alt="loading..."
        />
          <span class="user-fullname">
            {comentario.usuario.nome} {comentario.usuario.sobrenome}
          </span>
          <span class="user-nickname">@{comentario.usuario.username}</span>
      </div>
      <hr />
      <div>
        <p class="metrophobic comment--body">{comentario.texto}</p>
      </div>
    </div>
  );
}

export default Comentario;
