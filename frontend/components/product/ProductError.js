import React, { useContext, useEffect } from "react";
import ProductContext from "../../context/productContext";
import Link from "next/link";
const OperationError = ({ msgResp }) => {
  const { closeModalError, modalError } = useContext(ProductContext);

  useEffect(() => {
    return () => closeModalError();
  }, []);

  return (
    <>
      <div className={`modal-box medium-size ${modalError ? "active" : ""}`}>
        <div className="head-modal">
          <h2>
            Lo sentimos! Ha ocurrido un error al momento de procesar tu compra
          </h2>
        </div>
        <div className="modal-box-inner">
          <p>{msgResp}</p>
          <p></p>

          <div className="btns-block5">
            <Link href="/carrito">
              <a className="btn-primary btn-size-1">Modificar</a>
            </Link>
          </div>
        </div>
      </div>
      <div className={`screen ${modalError ? "shadow" : ""} `}></div>
    </>
  );
};

export default OperationError;
