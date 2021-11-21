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
        <hr />
        <div className="artigo">
        <h4 className="artigo--titulo">Volta ao presencial</h4>
        <p className="artigo--sumario">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget nunc ac tortor semper consectetur et ultricies orci. Praesent lorem erat, feugiat eu pharetra ut, volutpat ut felis.   
        <a href="www.google.com" target="_blank"> Leia mais...</a>
        </p>  
        <hr />
        </div>

        <div className="artigo">
        <h4 className="artigo--titulo">Renovação de matricula</h4>
        <p className="artigo--sumario">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget nunc ac tortor semper consectetur et ultricies orci. Praesent lorem erat, feugiat eu pharetra ut, volutpat ut felis.   
        <a href="www.google.com" target="_blank"> Leia mais...</a>
        </p>  
        <hr />
        </div>

        <div className="artigo">
        <h4 className="artigo--titulo">IFTEC2022</h4>
        <p className="artigo--sumario">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget nunc ac tortor semper consectetur et ultricies orci. Praesent lorem erat, feugiat eu pharetra ut, volutpat ut felis.   
        <a href="www.google.com" target="_blank"> Leia mais...</a>
        </p>  
        <hr />
        </div>
      </div>
    </section>
  )
}

export default RightNav;