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

        <div>
          { data &&
            <pre>{JSON.stringify(data, null, 2)}</pre>
          }
        </div>
      </div>
    </section>
  )
}

export default RightNav;