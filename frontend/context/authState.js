import React, {
  useState,
  useContext,
  useReducer,
  useEffect,
  createContext,
} from "react";
import AuthReducer from "./authReducer";
import { useRouter } from "next/router";
import { SET_USER, RESET_USER } from "../types";
import { useQuery, gql } from "@apollo/client";
const AuthContext = createContext({});
const GET_USER_DATA = gql`
  query {
    getAuth {
      id
      name
      lastname
      role
    }
  }
`;
export const AuthState = (props) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_USER_DATA);

  const [loadingUser, setLoadingUser] = useState(loading);
  const initialState = {
    user: null,
    idUser: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    if (data) {
      setUser(data.getAuth);
      setLoadingUser(loading);
    } else {
      setLoadingUser(loading);
    }
  }, [data]);

  const setUser = (user) => {
    if (user) {
      dispatch({
        type: SET_USER,
        payload: user,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: RESET_USER,
    });
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        idUser: state.idUser,
        auth: !!state.user,
        loadingUser,
        setUser,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
