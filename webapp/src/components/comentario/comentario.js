import React from "react";
import "./style.css";


function Comentario() {
  return (
      <div className="comentario">
        <span className="commenter--info">
          <img src="https://2img.net/h/images.wikia.com/naruto/es/images/6/6d/Mangekyou_Sharingan_Itachi.png" />
          <h5>José Uchiha</h5>
          <h6>@Jerry</h6>
        </span>
        <p className="comment--body">Shisui Nooooooooooooooo</p>
      </div>
  );
}

export default Comentario;
