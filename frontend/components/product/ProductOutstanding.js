import React from "react";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
const GET_PRODUCT = gql`
  query($id: ID!) {
    getProduct(id: $id) {
      name
      price
      id
      model
      photos {
        photo
      }
    }
  }
`;
const ProductOutstanding = ({ item }) => {
  const { title, subtitle, description } = item;
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id: item.id,
    },
  });

  if (!data) {
    return null;
  }
  const {
    getProduct: {  id: idProduct, photos },
  } = data;
  const previewproduct = photos[0].photo;
  return (
    <div className={`col`}>
    
      <div className="product-img">
      <Link href="/producto/[id]" as={`/producto/${idProduct}`}>
        <CloudinaryContext cloudName="chabelita">
          <Image publicId={previewproduct}>
            <Transformation crop="scale" width="800"/>
          </Image>
        </CloudinaryContext>
        </Link>
      </div>
      <div className="box-title">
        <h3 className="txt-center">{title}</h3>
        <h4 className="txt-center">
       
          {subtitle}
        </h4>
        <p className="txt-center">{description}</p>
        <Link href="/producto/[id]" as={`/producto/${idProduct}`}>
          <a className="btn-primary btn-size-1 btn-orientation-auto">Comprar</a>
        </Link>
      </div>
    </div>
  );
};

export default ProductOutstanding;
