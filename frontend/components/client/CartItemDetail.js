import React, { useState, useContext, useEffect } from "react";
import ProductContext from "../../context/productContext";
import NumberFormat from "react-number-format";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import Link from "next/link";
const CartItemDetail = ({ item }) => {
  const { removeItemCart, updateItemCart } = useContext(ProductContext);
  const { name, price, model, id, quantity, itemSize, sizes, photos } = item;

  const [counter, saveCounter] = useState(quantity);
  const [totalItemDetail, saveTotalItemDetail] = useState(price * quantity);
  const [itemSizeDetail, setItemSizeDetail] = useState(itemSize);
  const [editSize, saveEditSize] = useState(false);
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

  const updateQuantity = () => {
    let item = {
      name,
      price,
      model,
      id,
      quantity: counter,
      totalItem: totalItemDetail,
      itemSize: itemSizeDetail,
      sizes,
      photos,
    };

    updateItemCart(item);
  };

  const updateSize = () => {
    let item = {
      name,
      price,
      model,
      id,
      quantity: counter,
      totalItem: totalItemDetail,
      itemSize: itemSizeDetail,
      sizes,
      photos,
    };

    updateItemCart(item);
    saveEditSize(false);
  };
  useEffect(() => {
    if (quantity !== counter || itemSizeDetail !== itemSize) {
      updateQuantity();
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
              onClick={() => removeItemCart(id)}
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
                              onClick={() => setItemSizeDetail(item.value)}
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
          <div className="resume-table-3 resume-qty">
            <div className="number-items">
              <button onClick={(e) => counterAction(e, -1)}>-</button>
              <span>{counter}</span>
              <button onClick={(e) => counterAction(e, 1)}>+</button>
            </div>
          </div>
        </li>

        <li>
          <div className="resume-table-4 resume-unit-price">
            <p>
              <NumberFormat
                value={totalItemDetail}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$ "}
              />
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CartItemDetail;
