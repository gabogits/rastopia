import React, { useEffect, useState } from "react";

const UpdateError = ({ msgResp }) => {
  const [updateError, setUpdateError] = useState(msgResp);
  useEffect(() => {
    if (msgResp) {
      setUpdateError(true);
    }
  }, [msgResp]);

  return (
    <>
      <div className={`modal-box medium-size ${updateError ? "active" : ""}`}>
        <div className="head-modal">
          <h2>No se puede actualizar el articulo.</h2>
        </div>
        <div className="modal-box-inner">
          <p>{msgResp}</p>
          <p></p>

          <div className="btns-block5">
            <div
              className="btn-primary btn-size-1"
              onClick={() => setUpdateError(false)}
            >
              Aceptar
            </div>
          </div>
        </div>
      </div>
      <div className={`screen ${updateError ? "shadow" : ""} `}></div>
    </>
  );
};

export default UpdateError;
