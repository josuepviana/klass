import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import Sidenav from "../../components/menu/sidenav";
import RightNav from "../../components/rightnav";
import Post from "../../components/post/post";
import "./style.css";

function Home() {
  const [textToPost, setTextToPost] = useState("");

  const [
    { data: posts, loadingPosts, error: errorGettingPosts },
    refreshPosts,
  ] = useAxios({
    url: "http://localhost:3000/posts",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("api-token"),
    },
  });

  const [
    { data: successPosting, loading: loadingAddPost, error: errorPosting },
    executeAddPost,
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
    <div className="home--layout">
      <Sidenav />

      <main>
        <section className="post--form">
          <textarea
            rows="10"
            cols="60"
            value={textToPost}
            onChange={(e) => setTextToPost(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleOnPostarClick}
            disabled={!textToPost}
          >
            Postar
          </button>
        </section>
        <section>
          {posts &&
            posts.map((post, i) => (
              <Post post={post} key={i} />
            ))}
        </section>
      </main>
      <aside className="right-nav">
        <RightNav />
      </aside>
    </div>
  );
}

export default Home;
