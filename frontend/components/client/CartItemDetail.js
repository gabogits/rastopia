import React, { useState, useContext, useEffect } from "react";
import ProductContext from "../../context/productContext";
import NumberFormat from "react-number-format";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import Link from "next/link";
import UpdateError from "../product/UpdateError";
import { quantityValidation } from "../../helpers";
import Error from "../templates/Error";

const CartItemDetail = ({ item }) => {
  const { removeItemCart, updateItemCart, cart } = useContext(ProductContext);
  const {
    name,
    price,
    model,
    id,
    quantity,
    itemSize,
    sizes,
    photos,
    quantityAvailable,
    nanoId,
  } = item;

  const [counter, saveCounter] = useState(quantity);
  const [totalItemDetail, saveTotalItemDetail] = useState(price * quantity);
  const [itemSizeDetail, setItemSizeDetail] = useState(itemSize);
  const [editSize, saveEditSize] = useState(false);
  const [editQuantity, saveEditQuantity] = useState(false);
  const [errorCart, saveErrorCart] = useState(null);
  const counterAction = (e, value) => {
    e.preventDefault();

    if (value + counter >= 1) {
      saveCounter(counter + value);
      saveTotalItemDetail((counter + value) * price);
    }
  };

  const sizesFilter = [
    { value: "XS" },
    { value: "S" },
    { value: "M" },
    { value: "L" },
    { value: "XL" },
  ];

  const sizesAvailables = sizes.map((item) => item.size);
  const saveEditHandle = () => {
    saveEditQuantity(true);
    saveCounter(quantity);
  };
  const validationUpdateSize = (value) => {
    const itemSizeExist = cart.find(
      (item) => item.id === id && item.itemSize === value
    );
    let itemsNum;

    if (itemSizeExist) {
      itemsNum = itemSizeExist.quantity + counter;
    } else {
      itemsNum = counter;
    }
    const errorQuantity = quantityValidation(
      quantityAvailable,
      value,
      itemsNum
    );

    if (errorQuantity) {
      saveErrorCart(errorQuantity);
      return;
    }
    console.log("si pasa la validacion", value);

    setItemSizeDetail(value);
  };
  const validationUpdateQuantity = (e) => {
    const errorQuantity = quantityValidation(
      quantityAvailable,
      itemSizeDetail,
      counter + 1
    );

    if (errorQuantity) {
      saveErrorCart(errorQuantity);
      return;
    }

    counterAction(e, 1);
  };
  const updateQuantity = () => {
    console.log(counter);
    let itemUpdated = {
      ...item,
      quantity: counter,
      quantityAvailable: quantityAvailable,
      totalItem: totalItemDetail,
      itemSize: itemSizeDetail,
      sizeChanged: false,
    };

    updateItemCart(itemUpdated);
    saveErrorCart(null);
  };

  const updateSize = () => {
    let itemUpdated = {
      ...item,
      quantity: counter,
      quantityAvailable: quantityAvailable,
      totalItem: totalItemDetail,
      itemSize: itemSizeDetail,
      sizeChanged: true,
    };

    updateItemCart(itemUpdated);
    saveEditSize(false);
    saveErrorCart(null);
  };
  useEffect(() => {
    if (quantity !== counter) {
      updateQuantity();
    }
    if (itemSizeDetail !== itemSize) {
      updateSize();
    }
  }, [counter, itemSizeDetail]);

  return (
    <div className="resume-table-item">
      <ul className="item-bag">
        <li>
          <div className="resume-table-1 resume-img">
            <Link href="/producto/[id]" as={`/producto/${id}`}>
              <CloudinaryContext cloudName="chabelita">
                <Image publicId={photos[0].photo}>
                  <Transformation width="300" crop="scale" angle="0" />
                </Image>
              </CloudinaryContext>
            </Link>
          </div>
        </li>
        <li>
          <div className="resume-table-2 resume-description">
            <h4>
              <strong>
                <Link href="/producto/[id]" as={`/producto/${id}`}>
                  {name}
                </Link>
              </strong>
            </h4>
            <p>{model}</p>
            <p>
              {" "}
              <NumberFormat
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$ "}
              />{" "}
            </p>

            <button
              className="btn-clear-style"
              onClick={() => removeItemCart(nanoId)}
            >
              Eliminar
            </button>
          </div>
        </li>
        <li>
          {sizesAvailables.indexOf("OS") < 0 ? (
            <>
              {!editSize ? (
                <>
                  <p>Talla {itemSizeDetail} </p>
                  <div
                    className="btn-blue-style"
                    onClick={() => saveEditSize(true)}
                  >
                    Editar
                  </div>
                </>
              ) : (
                <>
                  <div className="sizes-list small-version">
                    <ul>
                      {sizesFilter.map((item) => (
                        <li key={item.value}>
                          <div
                            className={`sizes-box ${
                              sizesAvailables.indexOf(item.value) > -1
                                ? "active"
                                : ""
                            }   ${
                              itemSizeDetail === item.value ? "selected" : ""
                            }`}
                          >
                            <button
                              onClick={() => validationUpdateSize(item.value)}
                            >
                              {item.value}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    onClick={() => saveEditSize(false)}
                    className="btn-clear-style"
                  >
                    Cancelar
                  </div>
                </>
              )}
            </>
          ) : (
            <p>
              {" "}
              Medida <strong>UNITALLA</strong>{" "}
            </p>
          )}
        </li>
        <li>
          {editQuantity ? (
            <div className="resume-table-3 resume-qty">
              <div className="number-items">
                <button onClick={(e) => counterAction(e, -1)}>-</button>
                <span>{quantity}</span>
                <button onClick={(e) => validationUpdateQuantity(e, 1)}>
                  +
                </button>
              </div>
              <div
                onClick={() => saveEditQuantity(false)}
                className="btn-clear-style"
              >
                Aceptar
              </div>
            </div>
          ) : (
            <>
              <p>Cantidad {quantity} </p>
              <div className="btn-blue-style" onClick={() => saveEditHandle()}>
                Editar Cantidad
              </div>
            </>
          )}

          {errorCart && <Error msg={errorCart} />}
        </li>

        <li>
          <div className="resume-table-4 resume-unit-price">
            <p>
              <NumberFormat
                value={quantity * price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$ "}
              />
            </p>
          </div>
        </li>
      </ul>

      <UpdateError msgResp={errorCart} />
    </div>
  );
};

export default CartItemDetail;
