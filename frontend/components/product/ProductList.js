import React, { useContext, useEffect, useState } from "react";
import Product from "./Product";
import Loader from "../templates/Loader";
import ProductContext from "../../context/productContext";
import { useLazyQuery, gql } from "@apollo/client";
import { PRICE_INIT_VALUE } from "../../helpers/";
const GET_PRODUCTS = gql`
  query ($input: ProductFilterInput) {
    getProductsFilter(input: $input) {
      name
      category
      price
      model
      id
      quantity {
        size
        quantity
      }
      sizes {
        size
      }
      genre
      photos {
        photo
      }
    }
  }
`;
const ProductList = ({ genre }) => {
  const {
    filter,
    filterChange,
    setFilter,
    setFilterChange,
    products,
    results,
    shoppingRoute,
    setShoppingRoute,
    saveProducts,
  } = useContext(ProductContext);

  const [inputFilter, setInputFilter] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [currentGenre, setCurrentGenre] = useState(genre);

  const resetFilters = () => {
    const filter = {
      category: "",
      price: PRICE_INIT_VALUE,
      sizes: [],
    };
    setFilter(filter);
  };

  const [moreProducts, { loading, data }] = useLazyQuery(GET_PRODUCTS, {
    variables: {
      input: inputFilter,
    },
    skip: !inputFilter ? true : false,
  });
  const setValuesFilter = () => {
    let setInput = {};

    const limit = 6;
    setInput.skip = products.length;
    setInput.limit = limit;
    setInput.genre = genre.toUpperCase();

    const keys = Object.keys(filter);
    for (const key of keys) {
      if (key === "sizes") {
        if (filter[key].length > 0) {
          setInput[key] = filter[key];
        }
      } else {
        if (filter[key] !== "") {
          setInput[key] = filter[key];
        }
      }
    }

    setInputFilter(setInput);
  };
  const moreResults = async () => {
    setValuesFilter();
    moreProducts();
  };

  useEffect(() => {
    setShoppingRoute(genre);
    setCurrentGenre(genre);
    if (products.length === 0 && filterChange) {
      moreResults();
      setFilterChange(false);
    }

    if (data && data !== currentData) {
      saveProducts(data);
      setCurrentData(data);
    }
  }, [filter, genre, data]);
  useEffect(() => {
    return () => {
      if (shoppingRoute !== currentGenre) {
        resetFilters();
      }
    };
  }, [shoppingRoute]);
  console.log(products);
  return (
    <div className="cards-section">
      <div className="cards-section-inner cards-3">
        {products.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
      {results ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="btns-block2">
              <button
                className="btn-medium  btn-color-4 btn-size-3"
                onClick={() => moreResults()}
              >
                Cargar más
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="post box-format txt-center">
          Ya no hay mas resultados
        </div>
      )}
    </div>
  );
};
export default ProductList;
