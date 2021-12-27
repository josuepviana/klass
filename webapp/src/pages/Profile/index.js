import useAxios from "axios-hooks";
import React, { useContext } from "react";
import Post from "../../components/post/post";

import "./style.css";
import ContentLayout from "../../layout/ContentLayout";
import { UsuarioContext } from "../../auth/usuario-context";

function Profile() {
  const { usuario } = useContext(UsuarioContext);

  console.log({ usuario })

  const [
    { data: posts, loadingPosts, error: errorGettingPosts },
    refreshPosts,
  ] = useAxios({
    url: "http://localhost:3000/posts",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("api-token"),
    },
  });

  return (
    <ContentLayout>
      <div className="profile--wrap">
        <div class="content-profile-page">
          <div class="profile-user-page card">
            <div class="img-user-profile">
              <img class="profile-bgHome" src="https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg" />
              <img class="avatar" src="https://storage.googleapis.com/klass-network/josersinacio.png" alt={usuario.username} />
            </div>
            <div class="user-profile-data">
              <h1>{usuario.nome} {usuario.sobrenome}</h1>
              <p>{usuario.curso.nome}</p>

              <div class="description-profile">Sou um SJW!</div>

              <button>Seguir</button>

            </div>
            <ul class="data-user">
              <li><a><strong>666</strong><span>Fotos</span></a></li>
              <li><a><strong>420</strong><span>Seguidores</span></a></li>
              <li><a><strong>69</strong><span>Seguindo</span></a></li>
            </ul>
          </div>
        </div>
        <section className="userPosts">
          {posts &&
            posts.map((post, i) => (
              <Post post={post} key={i} />
            ))}
        </section>
      </div>
    </ContentLayout>
  );
}

export default Profile;