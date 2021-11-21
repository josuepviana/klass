import React from "react";
import "./style.css";



function Comentario({ comentario }) {
  return (
    <div className="comentario">
      <span className="commenter--info">
        <img src="https://2img.net/h/images.wikia.com/naruto/es/images/6/6d/Mangekyou_Sharingan_Itachi.png" />
        <h5>{comentario.usuario.nome + ' ' + comentario.usuario.sobrenome}</h5>
        <h6>@{comentario.usuario.username}</h6>
      </span>
      <p className="comment--body">{comentario.texto}</p>
    </div>
  );
}

export default Comentario;
