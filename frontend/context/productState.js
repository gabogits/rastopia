import React, { useReducer } from "react";
import ProductContext from "./productContext";
import ProductReducer from "./productReducer";

import {
  FILTER_SET,
  FILTER_SET_INIT,
  CLEAR_PRODUCTS_PROPIERTIES,
  PRODUCTS_NOT_RESULTS,
  SAVE_PRODUCTS,
  CART_SET,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  SHOW_CART,
  RESET_CART,
  SET_SHOPPING_ROUTE,
  SAVE_ORDER_DATA,
  SET_CURRENT_ROUTE,
  RESET_PRODUCT,
  OPEN_MODAL_ERROR,
  CLOSE_MODAL_ERROR,
  SAVE_ORDERS,
  ORDERS_NOT_RESULTS,
  RESET_ORDERS,
  SELECT_STATUS_ORDER,
} from "../types";
import { PRICE_INIT_VALUE } from "../helpers";
const ProductState = (props) => {
  const initialState = {
    products: [],
    loader: false,
    results: false,
    filter: {
      category: "",
      price: PRICE_INIT_VALUE,
      sizes: [],
    },
    filterChange: true,
    cart: [],
    openCart: false,
    loader: false,
    shoppingRoute: "",
    orderData: {},
    modalError: false,
    currentRoute: null,
    orders: [],
    resultsOrders: true,
    selectStatus: "TODOS",
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);
  const getProducts = async (products) => {};
  const setFilter = (filter) => {
    let values;

    const keys = Object.keys(filter);
    for (const key of keys) {
      if (filter[key] !== "" || filter[key].length > 0) {
        values = true;
      }
    }

    if (values) {
      dispatch({
        type: CLEAR_PRODUCTS_PROPIERTIES,
      });
    }

    dispatch({
      type: FILTER_SET,
      payload: filter,
    });
  };
  const setFilterChange = () => {
    dispatch({
      type: FILTER_SET_INIT,
    });
  };
  const clearProducts = () => {
    dispatch({
      type: CLEAR_PRODUCTS_PROPIERTIES,
    });
  };
  const saveProducts = (products) => {
    if (products.getProductsFilter.length) {
      dispatch({
        type: SAVE_PRODUCTS,
        payload: products.getProductsFilter,
      });
    } else {
      dispatch({
        type: PRODUCTS_NOT_RESULTS,
        payload: products.getProductsFilter,
      });
    }
  };

  const setCart = (product) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: product.id,
    });
    dispatch({
      type: CART_SET,
      payload: product,
    });
  };

  const removeItemCart = (id) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  };

  const updateItemCart = (product) => {
    dispatch({
      type: UPDATE_CART_ITEM,
      payload: product,
    });
  };

  const resetCart = () => {
    dispatch({
      type: RESET_CART,
    });
  };
  const setShoppingRoute = (route) => {
    dispatch({
      type: SET_SHOPPING_ROUTE,
      payload: route,
    });
  };
  const saveOrderData = ({ id, delivery }) => {
    const orderInfo = {
      idOrder: id,
      deliveryOrder: delivery,
    };
    dispatch({
      type: SAVE_ORDER_DATA,
      payload: orderInfo,
    });
  };
  const saveOrders = (response) => {
    if (response.getOrders.length) {
      dispatch({
        type: SAVE_ORDERS,
        payload: response.getOrders,
      });
    } else {
      dispatch({
        type: ORDERS_NOT_RESULTS,
        payload: response.getOrders,
      });
    }
  };

  const resetOrders = () => {
    dispatch({
      type: RESET_ORDERS,
    });
  };

  const setCurrentRoute = (route) => {
    dispatch({
      type: SET_CURRENT_ROUTE,
      payload: route,
    });
  };
  const openModalError = () => {
    dispatch({
      type: OPEN_MODAL_ERROR,
    });
  };

  const closeModalError = () => {
    dispatch({
      type: CLOSE_MODAL_ERROR,
    });
  };

  const resetProductState = () => {
    dispatch({
      type: RESET_PRODUCT,
    });
  };
  const showCart = (value) => {
    dispatch({
      type: SHOW_CART,
      payload: value,
    });
  };

  const setSelectStatus = (value) => {
    dispatch({
      type: SELECT_STATUS_ORDER,
      payload: value,
    });
  };
  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        results: state.results,
        filter: state.filter,
        cart: state.cart,
        openCart: state.openCart,
        shoppingRoute: state.shoppingRoute,
        orderData: state.orderData,
        modalError: state.modalError,
        filterChange: state.filterChange,
        currentRoute: state.currentRoute,
        orders: state.orders,
        resultsOrders: state.resultsOrders,
        selectStatus: state.selectStatus,
        setFilter,
        setFilterChange,
        getProducts,
        saveProducts,
        setCart,
        updateItemCart,
        removeItemCart,
        showCart,
        resetCart,
        setShoppingRoute,
        saveOrderData,
        openModalError,
        closeModalError,
        resetProductState,
        clearProducts,
        setCurrentRoute,
        saveOrders,
        resetOrders,
        setSelectStatus,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;