import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./../components/layout/Layout";
import CartItemDetail from "./../components/client/CartItemDetail";
import Link from "next/link";
import ProductContext from "../context/productContext";
import NumberFormat from "react-number-format";

import { SHIPMENT_VALUE, itemsBag } from "../helpers/";
const ShoppingCart = () => {
  const router = useRouter();
  const { cart, setCurrentRoute, shoppingRoute } = useContext(ProductContext);
  const [totalItems, saveTotalItems] = useState(0);

  const subtotalItems = () => {
    let totalItemsSum = 0;
    cart.forEach((element) => {
      totalItemsSum = totalItemsSum + Number(element.totalItem);
    });

    saveTotalItems(totalItemsSum);
  };

  useEffect(() => {
    subtotalItems();
    setCurrentRoute();
    setCurrentRoute(router.pathname);
    if (cart.length === 0) {
      router.push("/");
    }
    console.log("actualizandooo");
  }, [cart]);

  return (
    <Layout>
      <section className="shopping-cart top-bottom-space gray-back-1  ">
        <div
          className="navigation-btn back-btn hide-nav-btn"
          onClick={() => router.back()}
        ></div>
        <div className="container">
          <section className="resume">
            <div className="resume-head box-card">
              <h2> </h2>
              <div className="box-title">
                <h2>
                  MI SELECCIÓN <small> ({itemsBag(cart)}) </small>
                </h2>
              </div>
            </div>

            <div className="resume-content">
              <div className="resume-table-content">
                {cart.map((item) => (
                  <CartItemDetail key={item.nanoId} item={item} />
                ))}
              </div>
              <div className="resume-table-bottom">
                <div className="resume-data">
                  <h3>
                    Subtotal{" "}
                    <strong>
                      {" "}
                      <NumberFormat
                        value={totalItems}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$ "}
                      />{" "}
                    </strong>
                  </h3>
                  <h4>
                    Precio de envio{" "}
                    <span>
                      <NumberFormat
                        value={SHIPMENT_VALUE}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$ "}
                      />
                    </span>
                  </h4>
                  <h2>
                    Total{" "}
                    <strong>
                      {" "}
                      <NumberFormat
                        value={totalItems + SHIPMENT_VALUE}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$ "}
                      />{" "}
                    </strong>
                  </h2>
                </div>
              </div>
            </div>
          </section>

          <div className="btns-block3">
            <Link href={shoppingRoute ? `/catalogo/${shoppingRoute}` : "/"}>
              <a className="btn-primary btn-color-1 btn-size-3 icon-arrow-left">
                Continuar comprando
              </a>
            </Link>
            <Link href="/checkout">
              <a className="btn-primary btn-size-3">Comprar</a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ShoppingCart;
