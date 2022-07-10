import { SET_USER, RESET_USER, SET_TOKEN } from "../types";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        idUser: action.payload.id,
        user: action.payload,
        loading: false,
      };
    case RESET_USER:
      return {
        ...state,
        auth: false,
        user: null,
        idUser: null,
      };
    default:
      return state;
  }
};

export default reducer;
