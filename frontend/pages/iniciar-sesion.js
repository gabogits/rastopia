import React, { useState, useEffect, useContext } from "react";
import Layout from "./../components/layout/Layout";
import Error from "../components/templates/Error";
import Loader from "../components/templates/Loader";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import Link from "next/link";
import useAuth from "../context/authState";
import ProductContext from "../context/productContext";

const LOGIN = gql`
  mutation authUser($input: AuthInput) {
    authUser(input: $input) {
      token
    }
  }
`;
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
const Login = () => {
  const [authUser] = useMutation(LOGIN);
  const [msgResp, msgRespSave] = useState();
  const router = useRouter();
  const [loader, saveLoader] = useState(false);

  const [
    getUserData,
    { loading: loading_user, data: data_user },
  ] = useLazyQuery(GET_USER_DATA);

  const { setUser,  user } = useAuth();
  const { currentRoute } = useContext(ProductContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      saveLoader(true);
      try {
        const { data } = await authUser({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        getUserData();
        const { token } = data.authUser;
        localStorage.setItem("token", token);

        msgRespSave(null);
      } catch (error) {
        console.log(error);
        msgRespSave(error.message.replace("GraphQL error:", ""));
        saveLoader(false);
      }
    },
  });
  useEffect(() => {
    if (data_user) {
      setUser(data_user.getAuth);
      if (currentRoute) {
        router.push(currentRoute);
      } else {
        router.push("/");
      }
    }
  }, [data_user]);

  useEffect(() => {
    if (user && !data_user) {
      if (currentRoute) {
        router.push(currentRoute);
      } else {
        router.push("/");
      }
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <Layout>
      <section className="form top-bottom-space">
        <div className="container">
          
            <section className="section-format ">
              <form onSubmit={formik.handleSubmit}>
                <div className="section-format-head">
                  <div className="box-title">
                    <h2>Inicia sesión</h2>
                  </div>
                </div>
                <div className="field">
                  <label>Correo</label>
                  <input
                    type="email"
                    className="u-full-width"
                    name="email"
                    placeholder="correo@algo.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <Error msg={formik.errors.email}></Error>
                )}
                <div className="field">
                  <label>Contraseña</label>
                  <input
                    name="password"
                    type="password"
                    className="u-full-width"
                    placeholder="*****"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <Error msg={formik.errors.password}></Error>
                )}
                {msgResp && <Error msg={msgResp}></Error>}
                {loader ? <Loader /> :  <div className="btns-block">
                  <button
                    type="submit"
                    className="btn-primary  btn-size-1 btn-orientation-auto"
                    value="enviar"
                  >
                    Inicia sesión
                  </button>
                </div>}
               

                <div className="other-actions">
                  <Link href={"/crear-cuenta"}>
                    <a className="link-style">
                      ¿Aún no tienes cuenta? Da clic aquí.
                    </a>
                  </Link>
                </div>
              </form>
            </section>
           
         
        </div>
      </section>
    </Layout>
  );
};

export default Login;
