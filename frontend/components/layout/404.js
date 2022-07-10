import React from "react";
import Link from "next/link";
const Error404 = () => {
  return (
    <section className="modu error-screen">
      <div className="box-title ">
        <h2 className="txt-center">
          Lo sentimos, no hemos tenido suerte con tu solictud.
        </h2>
      </div>
      <div className="icon-big  search-icon"></div>
      <div className="box-title ">
        <h3 className="txt-center">Intenta nuevamente desde el inicio.</h3>
      </div>

      <div className="btns-block">
        <Link href={"/"}>
          <a className="btn-primary btn-color-5 btn-size-2">Ir a el inicio</a>
        </Link>
      </div>
    </section>
  );
};

export default Error404;
