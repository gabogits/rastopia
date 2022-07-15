import React, { useContext } from "react";
import ProductContext from "../../context/productContext";
import Link from "next/link";
import NumberFormat from "react-number-format";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
const CartItem = ({ item }) => {
  const { removeItemCart } = useContext(ProductContext);

  const { name, price, id, quantity, totalItem, itemSize, photos, nanoId } =
    item;

  return (
    <li className="item-list">
      <figure className="item-list-img">
        <Link href="/producto/[id]" as={`/producto/${id}`}>
          <CloudinaryContext cloudName="chabelita">
            <Image publicId={photos[0].photo}>
              <Transformation width="85" crop="scale" angle="0" />
            </Image>
          </CloudinaryContext>
        </Link>
      </figure>

      <div className="item-list-txt">
        <div className="item-list-col-1">
          <h3>
            {" "}
            <Link href="/producto/[id]" as={`/producto/${id}`}>
              {name}
            </Link>
          </h3>
        </div>
        <div className="item-list-col-2">
          <p>Talla {itemSize}</p>
          <p>
            {" "}
            Precio
            <NumberFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" $"}
            />{" "}
            Cantidad {quantity}
          </p>

          <p>
            Subtotal
            <NumberFormat
              value={totalItem}
              displayType={"text"}
              thousandSeparator={true}
              prefix={" $"}
            />{" "}
          </p>
          <button
            className="btn-clear-style"
            onClick={() => removeItemCart(nanoId)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
