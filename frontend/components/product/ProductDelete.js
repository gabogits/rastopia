import React from "react";

const ProductDelete = ({
  modalDelete,
  saveModalDelete,
  removeProductAction,
}) => {
  return (
    <>
      <div className={`modal-box medium-size ${modalDelete ? "active" : ""}`}>
        <div className="head-modal">
          <h2>Eliminar publicación</h2>
        </div>
        <div className="modal-box-inner">
          <p>
            ¿Deseas <strong>eliminar</strong> esta producto?
          </p>

          <div className="btns-block4">
            <button
              type="button"
              className="btn-primary btn-color-1 btn-size-3 "
              onClick={() => saveModalDelete(false)}
            >
              Cancelar
            </button>
            <button
              onClick={removeProductAction}
              type="button"
              className="btn-primary  btn-size-1"
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
      <div className={`screen ${modalDelete ? "shadow" : ""} `}></div>
    </>
  );
};

export default ProductDelete;
