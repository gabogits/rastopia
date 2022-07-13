import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Layout from "./../components/layout/Layout";
import ProductHome from "../components/product/ProductHome";
import ProductOutstanding from "../components/product/ProductOutstanding";
import ProductContext from "../context/productContext";
import { useRouter } from "next/router";
const Home = () => {
  const router = useRouter();
  const { setCurrentRoute } = useContext(ProductContext);
  const productsHome = [
    { id: "5fa2c90fe0b10b4f68598007" },
    { id: "5fa2cb81e0b10b4f68598008" },
    { id: "5fa2d4fee0b10b4f6859800c" },
    { id: "5fa2d753e0b10b4f6859800d" },
  ];

  const productOut = [
    {
      id: "5fa2e7f96c844c0017dd4c58",

      title: "Listos para el invierno",
      subtitle: "Prendas cómodas en diferentes colores.",
      description:
        "Solo en línea. Los precios son los que se indican. No incluye prendas de tela de rizo.",
    },
    {
      id: "5fa2d11fe0b10b4f6859800b",

      title: "Nueva colección de suéteres y chamarras.",
      subtitle:
        "Calidad y sostenibilidad. Diferentes tonalidades. Ideales para tí",
      description: "Solo en línea. Los precios son los que se indican. ",
    },
  ];
  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, []);
  return (
    <Layout>
      <section className=" banner">
        <div className="container">
          <div className="banner-txt">
            <h2>NUEVA COLECCIÓN YUKIMIYO</h2>
            <h4>
              Descubre lo que hemos preparado para tì. Por tiempo limitado.
              Envios a domicilio.{" "}
            </h4>

            <Link href="catalogo/mujer">
              <a className="btn-primary btn-size-1">Comprar</a>
            </Link>
          </div>
        </div>
      </section>

      <section className="modu cards-home">
        <div className="box-title  ">
          <h2 className="txt-center">
            Descuentos de fin de temporada. Hasta agotar existencias
          </h2>
        </div>
        <div className="cards-section ">
          <div className="cards-section-inner cards-4">
            {productsHome.map((item) => (
              <ProductHome key={item.id} id={item.id} />
            ))}
          </div>
        </div>
      </section>
      <section className="modu-2">
        <div className={`simple-section-content`}>
          {productOut.map((item) => (
            <ProductOutstanding key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="modu cards-home">
        <div className="box-title  ">
          <h3 className="txt-center">Acerca de nosotros</h3>
          <p className="txt-center">Conoce por que somos la mejor opción</p>
        </div>
        <div className="cards-section ">
          <div>
            <Link href="/nosotros">
              <a className="btn-primary btn-color-4 btn-size-1 btn-orientation-auto">
                Nosotros
              </a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
