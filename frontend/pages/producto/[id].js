import React, { useState, useContext, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Error from "../../components/templates/Error";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import NumberFormat from "react-number-format";
import ProductContext from "../../context/productContext";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import Loader from "../../components/templates/Loader";
const GET_PRODUCT = gql`
  query ($id: ID!) {
    getProduct(id: $id) {
      id
      name
      model
      genre
      created
      price
      discount
      description
      quantity
      sizes {
        size
      }
      photos {
        photo
      }
    }
  }
`;

const Product = () => {
  const router = useRouter();
  const { setCart, setCurrentRoute, showCart } = useContext(ProductContext);
  const [counter, saveCounter] = useState(1);
  const [totalItem, saveTotalItem] = useState(0);
  const [itemSize, setItemSize] = useState("");
  const [errorCart, saveErrorCart] = useState(null);

  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  const sizesFilter = [
    { value: "XS" },
    { value: "S" },
    { value: "M" },
    { value: "L" },
    { value: "XL" },
  ];
  useEffect(() => {
    setCurrentRoute(router.pathname);
    if (data) {
      saveTotalItem(price);
    }
  }, [data]);
  if (loading) return <Loader />;

  if (!data) {
    return "aun no hay datos";
  }

  const {
    getProduct: { name, price, model, quantity, description, sizes, photos },
  } = data;

  const sizesAvailables = sizes.map((item) => item.size);
  console.log(sizesAvailables.indexOf("OS") === 0);
  const counterAction = (e, value) => {
    e.preventDefault();

    if (value + counter >= 1) {
      saveCounter(counter + value);
      saveTotalItem((counter + value) * price);
    }
  };

  const addCart = () => {
    const oneSize = sizesAvailables.indexOf("OS") === 0;
    if (itemSize !== "" || oneSize) {
      let item = {
        name,
        price,
        model,
        id,
        quantity: counter,
        totalItem,
        itemSize: !oneSize ? itemSize : "OS",
        sizes,
        photos,
      };
      showCart(true);
      setCart(item);
      saveErrorCart(null);
    } else {
      saveErrorCart("Debes seleccionar algúna talla");
    }
  };

  return (
    <Layout>
      <section className=" top-bottom-space">
        <section className="detail-card">
          <div className="cols-detail ">
            <div className="col">
              <div className="img-screen">
                <div
                  className="navigation-btn back-btn"
                  onClick={() => router.back()}
                ></div>
                {photos.map((item) => (
                  <div key={item.photo} className={`info-img-big`}>
                    <figure>
                      <CloudinaryContext cloudName="chabelita">
                        <Image publicId={item.photo}>
                          <Transformation width="1000" crop="scale" />
                        </Image>
                      </CloudinaryContext>
                    </figure>
                  </div>
                ))}
              </div>
            </div>
            <div className="col col-detail-txt">
              <div className="info-text">
                <div className="info-block">
                  <div className="box-title">
                    <h2> {name}</h2>
                    <p className="m-text">
                      MOD {model} | DIS {quantity}
                    </p>
                    <h3>
                      {" "}
                      <NumberFormat
                        value={price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />{" "}
                    </h3>
                  </div>

                  <div className="sizes-list">
                    <ul>
                      {sizesAvailables.indexOf("OS") === 0 ? (
                        <li>
                          <div>UNITALLA</div>
                        </li>
                      ) : (
                        <>
                          {sizesFilter.map((item) => (
                            <li key={item.value}>
                              <div
                                className={`sizes-box ${
                                  sizesAvailables.indexOf(item.value) > -1
                                    ? "active"
                                    : ""
                                }   ${
                                  itemSize === item.value ? "selected" : ""
                                }`}
                              >
                                <button
                                  onClick={(e) => setItemSize(item.value)}
                                >
                                  {item.value}
                                </button>
                              </div>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="alert-sp-bottom">
                    {errorCart !== null && <Error msg={errorCart} />}
                  </div>
                  <div className="btns-block4 sp-block">
                    <div className="number-items">
                      <button onClick={(e) => counterAction(e, -1)}>-</button>
                      <span>{counter}</span>
                      <button onClick={(e) => counterAction(e, 1)}>+</button>
                    </div>
                    {quantity > 0 ? (
                      <button
                        className=" btn-primary btn-size-flex"
                        onClick={addCart}
                      >
                        Agregar al carrito
                      </button>
                    ) : (
                      <div className="advice-product color-red ">
                        ITEM AGOTADO
                      </div>
                    )}
                  </div>
                </div>
                <div className="info-block description-box">
                  <div className="box-title">
                    <h4> DESCRIPCIÓN</h4>
                  </div>

                  <p>{description}</p>
                  <p>Informacion general de los productos</p>
                </div>

                <div className="info-block bullets description-box ">
                  <div className="box-title">
                    <h4>
                      {" "}
                      CARACTERÍSTICAS (información general de los productos)
                    </h4>
                  </div>
                  <ul>
                    <li>
                      {" "}
                      <p>Algodón suave </p>
                    </li>
                    <li>
                      {" "}
                      <p>100% algodón </p>
                    </li>
                    <li>
                      {" "}
                      <p>Lavar a maquina </p>
                    </li>
                    <li>
                      {" "}
                      <p>Importado </p>
                    </li>
                    <li>
                      {" "}
                      <p>Ajuste estándar </p>
                    </li>

                    <li>
                      <p>Detalles de costura </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Product;
