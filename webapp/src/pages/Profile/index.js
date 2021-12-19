import useAxios from "axios-hooks";
import React, { useContext } from "react";
import Post from "../../components/post/post";

import "./style.css";
import ContentLayout from "../../layout/ContentLayout";
import UsuarioContext from "../../auth/usuario-context";

function Profile() {
    const usuario = useContext(UsuarioContext);

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
<div className="content-profile-page">
   <div className="profile-user-page card">
      <div className="img-user-profile">
        <img className="profile-bgHome" src="https://37.media.tumblr.com/88cbce9265c55a70a753beb0d6ecc2cd/tumblr_n8gxzn78qH1st5lhmo1_1280.jpg" />
        <img className="avatar" src="http://gravatar.com/avatar/288ce55a011c709f4e17aef7e3c86c64?s=200" alt="jofpin"/>
           </div>
          <div className="user-profile-data">
            <h1>Joseph Hemorroidas</h1>
            <p>Sistemas para Internet</p>
                      <div className="description-profile">Sou um SJW!</div>

            <button>Seguir</button>

          </div> 
       <ul className="data-user">
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