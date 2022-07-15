import React, { useReducer, useEffect } from "react";
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
  SET_CART_STORAGE,
  DELETE_UPDATE_CART_ITEM,
} from "../types";
import { PRICE_INIT_VALUE, quantityValidation } from "../helpers";
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
    const itemSizeExist = state.cart.find(
      (item) => item.id === product.id && item.itemSize === product.itemSize
    );
    if (itemSizeExist) {
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: { ...product, nanoId: itemSizeExist.nanoId },
      });
      const cartUpdated = state.cart.map((item) =>
        item.nanoId === product.nanoId ? (item = product) : item
      );
      localStorage.setItem("cart", JSON.stringify(cartUpdated));
    } else {
      dispatch({
        type: CART_SET,
        payload: product,
      });
      localStorage.setItem("cart", JSON.stringify([...state.cart, product]));
    }
  };
  const setCartStorage = (value) => {
    dispatch({
      type: SET_CART_STORAGE,
      payload: value,
    });
  };
  const removeItemCart = (nanoId) => {
    const newCart = state.cart.filter((item) => item.nanoId !== nanoId);

    localStorage.setItem("cart", JSON.stringify(newCart));

    dispatch({
      type: REMOVE_CART_ITEM,
      payload: nanoId,
    });
  };

  const updateItemCart = (product) => {
    let cartStorageUpdated;

    const itemSizeExist = state.cart.find(
      (item) => item.id === product.id && item.itemSize === product.itemSize
    );

    if (product.sizeChanged && itemSizeExist) {
      const cartUpdated = state.cart
        .filter((item) => item.nanoId !== product.nanoId)
        .map((item) =>
          item.nanoId === itemSizeExist.nanoId
            ? {
                ...item,
                quantity: itemSizeExist.quantity + product.quantity,
                totalItem:
                  itemSizeExist.price *
                  (itemSizeExist.quantity + product.quantity),
              }
            : item
        );
      localStorage.setItem("cart", JSON.stringify(cartUpdated));
      dispatch({
        type: DELETE_UPDATE_CART_ITEM,
        payload: cartUpdated,
      });
    } else {
      cartStorageUpdated = state.cart.map((item) =>
        item.nanoId === product.nanoId ? (item = product) : item
      );
      localStorage.setItem("cart", JSON.stringify(cartStorageUpdated));
      dispatch({
        type: UPDATE_CART_ITEM,
        payload: product,
      });
    }
  };

  const resetCart = () => {
    localStorage.removeItem("cart");
    localStorage.clear();
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
    localStorage.removeItem("cart");
    localStorage.clear();
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

  useEffect(() => {
    const cartStorage = JSON.parse(localStorage.getItem("cart"));
    if (state.cart.length === 0 && cartStorage) {
      setCartStorage(cartStorage);
    }
  }, []);

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
