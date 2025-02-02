import React, { useContext, useEffect } from "react";
import useAxios from 'axios-hooks';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Comentario from "../comentario/comentario";
import FazerComentario from "../comentario-popup";
import { UsuarioContext } from "../../auth/usuario-context";

function Post({ post }) {

  const { usuario } = useContext(UsuarioContext);

  const [{ data, loading, error }, refreshComentarios] = useAxios({
    url: `http://localhost:3000/posts/${post.id}/comentarios`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("api-token"),
    },
  },
    { manual: true });

  const [
    { data: successPosting, loading: loadingAddComment, error: errorPosting },
    executeAddComment,
  ] = useAxios(
    {
      url: `http://localhost:3000/posts/${post.id}/comentarios`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("api-token"),
      },
    },
    { manual: true }
  );

  const [
    { data: successAddingFriend },
    executeAddFriend
  ] = useAxios(
    {
      url: "http://localhost:3000/usuarios/amigos",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("api-token"),
      },
    },
    { manual: true }
  );

  const handlePostarComentarioClick = (text) => {
    executeAddComment({
      data: {
        texto: text,
        username: usuario.username
      }
    });
  }

  const follow = (outroUsuario) => {
    executeAddFriend({
      data: {
        usuario: outroUsuario.id
      }
    })
  }

  useEffect(() => {
    refreshComentarios();
  }, [successPosting, successAddingFriend]);

  return (
    <fieldset className="post--layout">
      <section className="post--header">
        <img
          src={post.usuario.avatar}
          alt="loading..."
        />
        <div class="slackey">
          <div class="user-nickname">
            {post.usuario.nome} {post.usuario.sobrenome}
          </div>
          <div class="user-fullname">
            <span>@{post.usuario.username}</span> 
            &nbsp;
            { usuario.id != post.usuario.id &&
              <a className="seguir--anchor" onClick={() => follow(post.usuario)}>
                <small>{post.usuario.amigos.some(amigo => amigo.id === usuario.id) ? 'Seguindo' : 'Seguir'}</small>
              </a>
            }
          </div>
        </div>
      </section>
      <hr />
      <p class="metrophobic">{post.texto}</p>
      <hr />
      <div className="post--buttons">
        <button type="submit" className="open-sans">
          <FontAwesomeIcon icon={faThumbsUp} /> &nbsp; Curtir
        </button>
        <FazerComentario onPostarComentarioClick={handlePostarComentarioClick} />
      </div>
      { data &&
        <details className="post--verComentario open-sans">
        <summary><small>{data.length} comentário(s)</small></summary>
          <div>
            {data.map((comentario, i) => [
              <Comentario key={i} comentario={comentario} />,
              <hr className="comentario--divider" />,
            ])}
          </div>
        </details>
      }
    </fieldset>
  );
}

export default Post;
