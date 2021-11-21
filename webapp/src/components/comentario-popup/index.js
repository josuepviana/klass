import React, { useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function FazerComentario({ onPostarComentarioClick }) {

  const textareaRef = useRef()

  const postarComentarioClick = (closeAction) => {
    const text = (textareaRef.current.value || '').trim();

    if (text) {
      onPostarComentarioClick(text);
      closeAction();
    }
  }

  return (
    <Popup
      trigger={
        <button className="open-sans">
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
            <textarea cols="80" rows="10" ref={textareaRef} />
          </div>
          <div className="fazerComentario--buttons">
            <button onClick={() => postarComentarioClick(close)}>Postar Comentário</button>
          </div>
        </div>
      )}
    </Popup>
  );
}

export default FazerComentario;
