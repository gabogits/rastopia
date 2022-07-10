import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import NumberFormat from "react-number-format";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
const GET_PRODUCT = gql`
  query($id: ID!) {
    getProduct(id: $id) {
      name
      price
      id
      photos {
        photo
      }
    }
  }
`;
const ProductHome = ({ id }) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  if (!data) {
    return null;
  }
  const {
    getProduct: { name,  price, id: idProduct, photos },
  } = data;

  const previewproduct = photos[0].photo;
  return (
    <div className="card-item">
      <figure className="card-item-img">
        <Link href="/producto/[id]" as={`/producto/${idProduct}`}>
          <CloudinaryContext cloudName="chabelita">
            <Image publicId={previewproduct}>
              <Transformation width="550" crop="scale" />
            </Image>
          </CloudinaryContext>
        </Link>
      </figure>
      <div className="card-item-txt">
        <h4>
          <Link href="/producto/[id]" as={`/producto/${idProduct}`}>
            {name}
          </Link>
        </h4>

        <p>
          <NumberFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </p>
        <p className="txt-note">30% de descuento</p>
      </div>
    </div>
  );
};

export default ProductHome;
