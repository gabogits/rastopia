import React, { useEffect, useContext } from "react";
import CartItem from "./CartItem";
import Link from "next/link";
import ProductContext from "../../context/productContext";

const CartItems = () => {
  const { cart, showCart, openCart } = useContext(ProductContext);
  useEffect(() => {
    return () => {
      showCart(false);
    };
  }, []);
  return (
    <>
      <div className={`cart-section ${openCart ? "active" : ""}`}>
        <div className="cart-section-inner">
          <div className="box-title  extra-mg">
            <h3>TU BOLSA </h3>
          </div>
          <div className="close-not" onClick={() => showCart(false)}></div>
          <div className="cart-content">
            {cart.length === 0 && (
              <div className="zero-items">
                <p>Aún no tienes nada en tu bolsa</p>
              </div>
            )}
            <ul>
              {cart.map((item) => (
                <CartItem key={item.nanoId} item={item} />
              ))}
            </ul>
          </div>
          <div className="cart-bottom">
            {cart.length > 0 && (
              <>
                <div className="Subtotal">
                  <small>IVA incluido</small>
                </div>

                <div className="btn-content">
                  <Link href="/carrito">
                    <a className="btn-primary btn-orientation-auto">
                      Ver detalle
                    </a>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className={`screen ${openCart ? "shadow" : ""} `}
        onClick={() => showCart(false)}
      ></div>
    </>
  );
};

export default CartItems;
