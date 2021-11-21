import { useContext } from 'react';
import useAxios from "axios-hooks";
import UsuarioContext from '../../auth/usuario-context';
import './style.css'

function RightNav() {
  const usuario = useContext(UsuarioContext);

  const [{ data, loading, error }, tryAgain] = useAxios({
    url: `http://localhost:3000/faculdades/${usuario.faculdade.id}/feed`,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("api-token"),
    },
  });

  return (
    <section className="rightnav--layout">
      <div className="rightnav--content">
        <hgroup>
          <h4>{usuario.faculdade.nome}</h4>
          <h5>{usuario.curso.nome}</h5>
        </hgroup>

        <div className="rightnav--feed">
          {data &&
            data.items.map((item, i) => (
              <div>
                <hr />
                <div className="artigo">
                  <h4 className="artigo--titulo">{item.title}</h4>
                  <p className="artigo--sumario">
                    {item.contentSnippet}
                    <a className="artigo--link" href={item.link} target="_blank"> Leia mais...</a>
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