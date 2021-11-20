import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function Post({ post }) {
  return (
    <fieldset>
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
      <hr class="rounded" />
      <p>{post.texto}</p>
      <hr class="rounded" />
      <button type="submit">
        <FontAwesomeIcon icon={faThumbsUp} /> &nbsp; Curtir
      </button>
      <button type="submit">
        <FontAwesomeIcon icon={faComment} /> &nbsp; Comentar
      </button>
    </fieldset>
  );
}

export default Post;
