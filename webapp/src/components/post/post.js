import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Comentario from "../comentario/comentario";
import FazerComentario from "../comentario-popup";

function Post({ post }) {
  const [comentarios, setComentarios] = useState(Array(4).fill(1));

  return (
    <fieldset className="post--layout">
      <section className="post--header">
        <img
          src={"http://localhost:3001/img/" + post.usuario.avatar}
          alt="loading..."
        />
        <div>
          <div class="user-nickname">
            {post.usuario.nome} {post.usuario.sobrenome}
          </div>
          <div class="user-fullname">@{post.usuario.username}</div>
        </div>
      </section>
      <hr />
      <p>{post.texto}</p>
      <hr />
      <div className="post--buttons">
        <button type="submit">
          <FontAwesomeIcon icon={faThumbsUp} /> &nbsp; Curtir
        </button>
        <FazerComentario />
      </div>
      <details className="post--verComentario">
        <summary>Ver Comentários</summary>
        <div>
          {comentarios.map((comentario, i) => [
            <Comentario key={i} />,
            <hr className="comentario--divider" />,
          ])}
        </div>
      </details>
    </fieldset>
  );
}

export default Post;
