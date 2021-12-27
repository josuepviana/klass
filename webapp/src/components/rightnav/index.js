import { useContext } from 'react';
import useAxios from "axios-hooks";
import { UsuarioContext } from '../../auth/usuario-context';
import './style.css'

function RightNav() {
  const { usuario } = useContext(UsuarioContext);

  const [{ data }, tryAgain] = useAxios({
    url: `http://localhost:3000/faculdades/${usuario.faculdade.id}/feed`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("api-token"),
    },
  });

  return (
    <section className="rightnav--layout">
      <div className="rightnav--content">
        <hgroup className="open-sans">
          <h4>{usuario.faculdade.nome}</h4>
          <h5>{usuario.faculdade.campus}</h5>
        </hgroup>

        <div className="rightnav--feed">
          {data &&
            data.items.map((item, i) => (
              <div key={i}>
                <hr />
                <div className="artigo">
                  <h4 className="artigo--titulo open-sans">{item.title}</h4>
                  <p className="artigo--sumario metrophobic">
                    {item.contentSnippet.substr(0, 210)}
                    <a className="artigo--link" href={item.link} target="_blank">... Leia mais</a>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default RightNav;