import './style.css'

function RightNav() {
  return (
    <section className="rightnav--layout">
      <div className="rightnav--content">
      <h3>Instituto Federal de Brasília - Campi Asa Norte</h3>
      <h6>Instituição</h6>
      <hr className="rightnav--divider"/>
      <h4>Tecnologia em Sistemas para Internet</h4>
      <h6>Curso</h6>
      </div>
      <hr/>
      <div className="rightnav--content">
      <h3>Universidade de Brasilia  - Campi Asa Norte</h3>
      <h6>Instituição</h6>
      <hr className="rightnav--divider"/>
      <h4>Ciência da Computação</h4>
      <h6>Curso</h6>
      </div>
    </section>
  )
}

export default RightNav;