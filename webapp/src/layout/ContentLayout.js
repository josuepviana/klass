import useAxios from "axios-hooks";
import React from "react";
import UsuarioContext from "../auth/usuario-context";
import Sidenav from "../components/menu/sidenav";
import RightNav from "../components/rightnav";

import './ContentLayout.css'

function ContentLayout({ children }) {

  // const [{ data, loading, error }, tryAgain] = useAxios({
  //   url: "http://localhost:3000/profile",
  //   headers: {
  //     Authorization: "Bearer " + localStorage.getItem("api-token"),
  //   },
  // });


  // if (loading) {
  //   return <div />
  // }

  // if (error) {
  //   if (error.status === 401) {
  //     window.location.href = ''
  //   }

  //   return (
  //     <div>
  //       <code>
  //         {error.message}
  //       </code>
  //       <button onClick={tryAgain}/>
  //     </div>
  //   )
  // }

  return (
    <div className="content-layout">
      <Sidenav />
      <section>
        {children}
      </section>
      <aside>
        <RightNav />
      </aside>
    </div>
  )
} 

export default ContentLayout;