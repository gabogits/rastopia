import React, { useContext } from "react";
import Link from "next/link";
import CartItems from "./../client/CartItems";
import ProductContext from "../../context/productContext";
import useAuth from "../../context/authState";
import { itemsBag } from "../../helpers/";
const Header = () => {
  const { cart, resetProductState, showCart, openCart } = useContext(
    ProductContext
  );
  const { logout, user, idUser } = useAuth();

  const logoutActions = async () => {
    logout();
    resetProductState();
  };

  return (
    <>
      <header>
        <div className=" container-visible container-header">
          <div className="logo">
            <figure>
              <Link href="/">
                <a><span className="logo-desk">Yukimiyo</span><span className="logo-mobile">Y</span> </a>
              </Link>
            </figure>
          </div>
          <nav>
            <div className="nav-left">
              <div className="nav-list desk-version-menu">
                <ul>
                  <li>
                    <Link href="/catalogo/mujer">
                      <a>Mujer</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalogo/hombre">
                      <a>Hombre</a>
                    </Link>
                  </li>
                  {user && user.role == "admin" && (
                    <>
                      <li>
                        <Link href="/nuevo-producto">
                          <a>nuevo producto</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/pedidos">
                          <a>pedidos</a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="nav-icons mobile-version-menu">
                <ul>
                  <li>
                    <Link href="/catalogo/mujer">
                      <a className="icon-menu woman-icon"></a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/catalogo/hombre">
                      <a className="icon-menu man-icon"></a>
                    </Link>
                  </li>
                  {user && user.role == "admin" && (
                    <>
                      <li>
                        <Link href="/nuevo-producto">
                          <a className="icon-menu new-product-icon"></a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/pedidos">
                          <a className="icon-menu orders-icon"></a>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="nav-right">
              <div className="nav-icons">
                <ul>
                  {!user ? (
                    <>
                      <li>
                        <Link href="/iniciar-sesion">
                          <a className="icon-menu user-icon"></a>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link href="/perfil/[id]" as={`/perfil/${idUser}`}>
                          <a className="icon-menu user-icon"></a>
                        </Link>
                      </li>

                      <li>
                        <button
                          className="icon-menu out-icon"
                          onClick={() => logoutActions()}
                        ></button>
                      </li>
                    </>
                  )}

                  <li>
                    <button
                      onClick={() => showCart(!openCart)}
                      className="icon-menu bag-icon"
                    >
                      {cart.length > 0 && <span> {itemsBag(cart)} </span>}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <CartItems />
    </>
  );
};

export default Header;
