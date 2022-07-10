import {
  FILTER_SET,
  FILTER_SET_INIT,
  CLEAR_PRODUCTS_PROPIERTIES,
  SAVE_PRODUCTS,
  PRODUCTS_NOT_RESULTS,
  CART_SET,
  UPDATE_CART_ITEM,
  REMOVE_CART_ITEM,
  SHOW_CART,
  SET_SHOPPING_ROUTE,
  SAVE_ORDER_DATA,
  RESET_CART,
  RESET_PRODUCT,
  OPEN_MODAL_ERROR,
  CLOSE_MODAL_ERROR,
  SET_CURRENT_ROUTE,
  SAVE_ORDERS,
  ORDERS_NOT_RESULTS,
  RESET_ORDERS,
  SELECT_STATUS_ORDER,
} from "../types";

const reducer = (state, action) => {
  switch (action.type) {
    case SAVE_PRODUCTS:
      return {
        ...state,
        loader: false,
        products: [...state.products, ...action.payload],
        results: true,
      };
    case PRODUCTS_NOT_RESULTS:
      return {
        ...state,
        results: false,
      };
    case FILTER_SET:
      return {
        ...state,
        filter: action.payload,
        filterChange: true,
      };
    case FILTER_SET_INIT:
      return {
        ...state,
        filterChange: false,
      };
    case CLEAR_PRODUCTS_PROPIERTIES:
      return {
        ...state,
        products: [],
      };
    case CART_SET:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? (item = action.payload) : item
        ),
      };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case SET_SHOPPING_ROUTE:
      return {
        ...state,
        shoppingRoute: action.payload,
      };
    case SAVE_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
      };
    case SET_CURRENT_ROUTE:
      return {
        ...state,
        currentRoute: action.payload,
      };
    case SHOW_CART:
      return {
        ...state,
        openCart: action.payload,
      };

    case RESET_CART:
      return {
        ...state,
        cart: [],
      };
    case OPEN_MODAL_ERROR:
      return {
        ...state,
        modalError: true,
      };
    case CLOSE_MODAL_ERROR:
      return {
        ...state,
        modalError: false,
      };
    case SAVE_ORDERS:
      return {
        ...state,
        loader: false,
        orders: [...state.orders, ...action.payload],
        resultsOrders: true,
      };
    case RESET_ORDERS:
      return {
        ...state,
        orders: [],
        resultsOrders: true,
      };
    case SELECT_STATUS_ORDER:
      return {
        ...state,
        selectStatus: action.payload,
      };
    case ORDERS_NOT_RESULTS:
      return {
        ...state,
        resultsOrders: false,
      };
    case RESET_PRODUCT:
      return {
        ...state,
        products: [],
        loader: false,
        results: true,
        filter: {
          category: "",
          price: 0,
          sizes: [],
        },
        cart: [],
        loader: false,
        shoppingRoute: "",
        orderData: "",
        currentRoute: null,
      };
    default:
      return state;
  }
};

export default reducer;
