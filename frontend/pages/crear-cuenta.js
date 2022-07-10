import React, { useState, useContext, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import Error from "../components/templates/Error";
import Loader from "../components/templates/Loader";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import useAuth from "../context/authState";
import ProductContext from "../context/productContext";

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      name
      id
      email
      lastname
    }
  }
`;
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
const NewClient = () => {
  const [newClient] = useMutation(NEW_CLIENT);
  const [authUser] = useMutation(LOGIN);
  const router = useRouter();
  const [msgResp, msgRespSave] = useState();
  const [loader, saveLoader] = useState(false);
  const { setUser, user } = useAuth();
  const { currentRoute } = useContext(ProductContext);
  const [
    getUserData,
    { loading: loading_user, data: data_user },
  ] = useLazyQuery(GET_USER_DATA);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      lastname: Yup.string().required("El apellido es obligatorio"),
      email: Yup.string().required("El correo es obligatorio"),
      password: Yup.string()
        .required("Se requiere un password")
        .min(6, "Se requieren al menos 6 caracteres"),
    }),
    onSubmit: async (values) => {
      const { name, lastname, email, password } = values;
      saveLoader(true);
      try {
        await newClient({
          variables: {
            input: {
              name,
              lastname,
              email,
              password,
            },
          },
        });

        const { data } = await authUser({
          variables: {
            input: {
              email,
              password,
            },
          },
        });

        const { token } = data.authUser;
        localStorage.setItem("token", token);
        getUserData();
        msgRespSave(null);
      } catch (error) {
        msgRespSave(error.message.replace("GraphQL error:", ""));
        console.log(error);
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
          <section className="section-format col">
            <form onSubmit={formik.handleSubmit}>
              <div className="section-format-head">
                <div className="box-title">
                  <h2>Crea tu cuenta</h2>
                </div>
              </div>
              <div className="field">
                <label>Nombre</label>
                <input
                  type="text"
                  className="u-full-width"
                  placeholder="Nombre"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                  <Error msg={formik.errors.name}></Error>
                )}
              </div>

              <div className="field">
                <label>Apellido</label>
                <input
                  type="text"
                  className="u-full-width"
                  placeholder="Apellido"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <Error msg={formik.errors.lastname}></Error>
                )}
              </div>
              <div className="field">
                <label>Correo</label>
                <input
                  type="text"
                  className="u-full-width"
                  placeholder="correo@algo.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <Error msg={formik.errors.email}></Error>
                )}
              </div>

              <div className="field">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="u-full-width"
                  placeholder="*****"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password && (
                  <Error msg={formik.errors.password}></Error>
                )}
              </div>
              {msgResp && <Error msg={msgResp}></Error>}
              {loader ? <Loader /> : 
               <div className="section-format-actions">
               <button
                 type="submit"
                 className="btn-primary  btn-size-1 btn-orientation-auto"
                 value="enviar"
               >
                 Crear cuenta
               </button>
             </div>
              }
             

              <div className="other-actions">
                <Link href={"/iniciar-sesion"}>
                  <a className="link-style">¿Ya tienes cuenta? Da clic aquí.</a>
                </Link>
              </div>
            </form>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default NewClient;
