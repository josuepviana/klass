import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const FazerComentario = () => (
  <Popup
    trigger={
      <button>
        <FontAwesomeIcon icon={faComment} /> &nbsp; Comentar
      </button>
    }
    position="right center"
    modal
  >
    {(close) => (
      <div className="fazerComentario--layout">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="fazerComentario--content">
          <textarea cols="80" rows="10" />
        </div>
        <div className="fazerComentario--buttons">
          <button>Postar Comentário</button>
        </div>
      </div>
    )}
  </Popup>
);

export default FazerComentario;
