import { useState, useEffect, useRef } from "react";
import "../css/Modal.css";

function Modal(props) {

    function spanClose() {
        var modalWin = document.getElementById("myModal");
        modalWin.style.display = "none";
    }

    return (
        <div className="App2">

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span onClick={spanClose} className="close">&times;</span>
                        <h2 className="textGameOver">GAME OVER</h2>
                        <button className="btnPlayAgain" onClick={(e) => window.location.reload(e)}>PLAY AGAIN</button>
                </div>
            </div>
        </div>
    )
}
export default Modal;