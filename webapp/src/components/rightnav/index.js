import { useContext } from 'react';
import UsuarioContext from '../../auth/usuario-context';
import './style.css'

function RightNav() {
  const usuario = useContext(UsuarioContext);

  return (
    <section className="rightnav--layout">
      <div className="rightnav--content">
        <h4>{usuario.faculdade.nome}</h4>
        <h5>{usuario.curso.nome}</h5>
      </div>
    </section>
  )
}

export default RightNav;