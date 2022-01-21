import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import Post from "../../components/post/post";
import "./style.css";
import ContentLayout from "../../layout/ContentLayout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [textToPost, setTextToPost] = useState("");

  const [
    { data: posts }, refreshPosts,
  ] = useAxios({
    url: "http://localhost:3000/usuarios/feed",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("api-token"),
    },
  });

  const [
    { data: successPosting },
    executeAddPost
  ] = useAxios(
    {
      url: "http://localhost:3000/posts",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("api-token"),
      },
    },
    { manual: true }
  );

  useEffect(() => {
    if (successPosting) {
      refreshPosts();
    }
  }, [successPosting]);

  const handleOnPostarClick = () => {
    executeAddPost({
      data: {
        texto: textToPost,
      },
    });
  };

  return (
    <ContentLayout>
      <main className="home--content-main">
        <section className="post--form">
          <textarea
            rows="10"
            cols="60"
            value={textToPost}
            onChange={(e) => setTextToPost(e.target.value)}
          />
          <div align="center">
          <button
            type="submit"
            onClick={handleOnPostarClick}
            disabled={!textToPost}
            className="open-sans"
          ><FontAwesomeIcon icon={ faPaperPlane }/> &nbsp;
            Postar
          </button>
          </div>
        </section>
        <section>
          {posts &&
            posts.map((post, i) => (
              <Post post={post} key={i} />
            ))}
        </section>
      </main>
    </ContentLayout>
  );
}

export default Home;
