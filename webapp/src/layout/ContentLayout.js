import useAxios from "axios-hooks";
import React from "react";
import UsuarioContext from "../auth/usuario-context";
import Sidenav from "../components/menu/sidenav";
import RightNav from "../components/rightnav";

import './ContentLayout.css'

function ContentLayout({ children }) {

  const [{ data, loading, error }] = useAxios({
    url: "http://localhost:3000/profile",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("api-token"),
    },
  });


  if (loading) {
    return <div />
  }

  return (
    <UsuarioContext.Provider value={data}>
      <div className="content-layout">
        <Sidenav />
        <section>
          {children}
        </section>
        <aside>
          <RightNav />
        </aside>
      </div>
    </UsuarioContext.Provider>
  )
} 

export default ContentLayout;