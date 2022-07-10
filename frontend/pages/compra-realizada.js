import React, { useContext, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import Link from "next/link";
import ProductContext from "../context/productContext";
import { PrivateRoute } from "./../components/routes/PrivateRoute";
import { useRouter } from "next/router";
import { getFullDate } from "../helpers/";

const OperationSuccess = () => {
  const router = useRouter();
  const {
    cart,
    resetCart,
    shoppingRoute,
    orderData,
    setCurrentRoute,
  } = useContext(ProductContext);

  useEffect(() => {
    setCurrentRoute(router.pathname);
    if (cart.length === 0) {
      router.push("/");
    }
    return () => {
      resetCart();
    };
  }, []);

  return (
    <Layout>
      <section className="msg-response success-response top-bottom-space">
        <div
          className="navigation-btn back-btn"
          onClick={() => router.back()}
        ></div>
        <div className="container">
          <div className="msg-icon success-icon"></div>
          <div className="box-title success-msg ">
            <h2 className="txt-center">
              La compra se ha realizado exitosamente
            </h2>

            <h4 className="txt-center">
              La fecha de entrega será el día:{" "}
              <strong>{getFullDate(orderData.deliveryOrder)}</strong>
            </h4>
            <h5 className="txt-center">
              El numero de tu orden es {orderData.idOrder}{" "}
            </h5>
            <h5 className="txt-center">
              Tu orden ha sido confirmada y en breve recibiras la confirmación
              al correo que registraste
            </h5>
          </div>

          <div className="btns-block">
            <Link href={shoppingRoute ? `/catalogo/${shoppingRoute}` : "/"}>
              <a className="btn-primary btn-size-1">Continuar comprando</a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivateRoute(OperationSuccess);
