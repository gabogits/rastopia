import React from "react";
import Link from "next/link";
import NumberFormat from "react-number-format";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import useAuth from "../../context/authState";

const Product = ({ item }) => {
  const { id, name, model, price, photos, quantity } = item;
  const previewproduct = photos[0].photo;
  const { user } = useAuth();
  return (
    <div
      className={`card-item ${quantity.length === 0 ? "disabled-item" : ""}`}
    >
      <figure className="card-item-img">
        {quantity.length === 0 && (
          <div className="tag-absolute">Producto agotado</div>
        )}
        <Link href="/producto/[id]" as={`/producto/${id}`}>
          <CloudinaryContext cloudName="chabelita">
            <Image publicId={previewproduct}>
              <Transformation width="500" crop="scale" angle="0" />
            </Image>
          </CloudinaryContext>
        </Link>
      </figure>
      <div className="card-item-txt">
        <h4>
          <Link href="/producto/[id]" as={`/producto/${id}`}>
            {name}
          </Link>
        </h4>
        <p>MOD {model}</p>
        <p>
          <NumberFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$ "}
          />
        </p>

        {user && user.role === "admin" && (
          <Link href="/editar-producto/[id]" as={`/editar-producto/${id}`}>
            <a className="btn-clear-style">Editar producto</a>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Product;
