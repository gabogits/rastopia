import React, { useEffect, useContext } from "react";
import Layout from "./../../components/layout/Layout";

import ProductList from "./../../components/product/ProductList";
import ProductFilter from "./../../components/product/ProductFilter";
import ProductContext from "../../context/productContext";
import { useRouter } from "next/router";
const Catalogo = () => {
  const router = useRouter();
  const { setCurrentRoute } = useContext(ProductContext);

  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, []);
  return (
    <div className=" h-100">
      <Layout>
        <section className="ov-h ">
          <div className="top-bottom-space">
            <div className="cols-relative">
              <div className="col">
                <ProductFilter genre={`mujer`} />
              </div>
              <div className="col col-list">
                <ProductList genre={`mujer`} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Catalogo;
