import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery, gql } from "@apollo/client";
import ProductContext from "../context/productContext";
import useAuth from "../context/authState";
import Layout from "./../components/layout/Layout";
import Error from "../components/templates/Error";
import Loader from "../components/templates/Loader";
import ProductError from "./../components/product/ProductError";
import { PrivateRoute } from "./../components/routes/PrivateRoute";
import NumberFormat from "react-number-format";
import { SHIPMENT_VALUE } from "../helpers/";
import TextareaAutosize from "react-autosize-textarea/lib";
const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput!) {
    newOrder(input: $input) {
      id
      order {
        id
        quantity
        name
        price
        size
        photos {
          photo
        }
      }
      total
      status
      delivery
      created
    }
  }
`;
const GET_CLIENT = gql`
  query ($id: ID!) {
    getClient(id: $id) {
      id
      name
      lastname
      email
      phone
      address
      references
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateClient($id: ID!, $input: ClientUpdateInput!) {
    updateClient(id: $id, input: $input) {
      name
      lastname
      address
      phone
      references
    }
  }
`;
const Checkout = () => {
  const {
    cart,
    shoppingRoute,
    saveOrderData,
    openModalError,
    setCurrentRoute,
  } = useContext(ProductContext);
  const { user, idUser } = useAuth();
  const [newOrder] = useMutation(NEW_ORDER);

  const [updateClient] = useMutation(UPDATE_USER);
  const router = useRouter();
  const [msgResp, msgRespSave] = useState();
  const [checkAccept, saveCheckAccept] = useState(false);
  const [loader, saveLoader] = useState(false);

  const [totalItems, saveTotalItems] = useState(0);

  const subtotalItems = () => {
    let totalItemsSum = 0;
    cart.forEach((element) => {
      totalItemsSum = totalItemsSum + Number(element.totalItem);
    });

    saveTotalItems(totalItemsSum);
  };
  const { data, loading, error } = useQuery(GET_CLIENT, {
    variables: {
      id: idUser,
    },
    skip: !idUser ? true : false,
  });
  useEffect(() => {
    subtotalItems();
    setCurrentRoute(router.pathname);
    if (!user) {
      router.push("/iniciar-sesion");
    }
    if (cart.length === 0) {
      router.push("/");
    }
  }, [cart, user]);
  const schemaValidation = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    lastname: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string().required("El correo es obligatorio"),
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string().required("El telefono es obligatorio"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Tienes que aceptar los termninos y condiciones"
    ),
  });

  if (loading) return <Loader />;

  if (!data) {
    return "aun no hay datos";
  }

  const submitOrderAction = async (values) => {
    try {
      saveLoader(true);
      console.log(values);

      const { dataUser } = await updateClient({
        variables: {
          id: getClient.id,
          input: {
            address: values.address,
            name: values.name,
            lastname: values.lastname,
            phone: values.phone,
            references: values.references,
          },
        },
      });
      console.log(dataUser);

      const { data } = await newOrder({
        variables: {
          input: {
            order: cart.map((item) => {
              return {
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                size: item.itemSize,
                price: item.price,
                photos: item.photos.map((item) => {
                  return {
                    photo: item.photo,
                  };
                }),
              };
            }),
            client: getClient.id,
          },
        },
      });
      saveOrderData(data.newOrder);
      router.push("/compra-realizada");
    } catch (error) {
      msgRespSave(error.message);
      openModalError();
      saveLoader(false);
    }
  };

  const { getClient } = data;

  return (
    <Layout>
      <section className="form top-bottom-space">
        <div
          className="navigation-btn back-btn hide-nav-btn"
          onClick={() => router.back()}
        ></div>
        <div className="container">
          <div className="cols cols-check">
            <section className="section-format col">
              <Formik
                enableReinitialize
                initialValues={getClient}
                validationSchema={schemaValidation}
                onSubmit={(values) => {
                  submitOrderAction(values);
                }}
              >
                {(props) => {
                  return (
                    <form onSubmit={props.handleSubmit}>
                      <div className="section-format-head">
                        <div className="box-title">
                          <h2>DIRECCIÓN DE ENTREGA</h2>
                        </div>
                      </div>
                      <div className="field">
                        <label>Nombre</label>
                        <input
                          type="text"
                          className="u-full-width"
                          placeholder="Nombre"
                          name="name"
                          onChange={props.handleChange}
                          value={props.values.name}
                        />
                        {props.touched.name && props.errors.name && (
                          <Error msg={props.errors.name}></Error>
                        )}
                      </div>
                      <div className="field">
                        <label>Apellido</label>
                        <input
                          type="text"
                          disabled="disabled"
                          className="u-full-width"
                          name="name"
                          onChange={props.handleChange}
                          value={props.values.lastname}
                        />
                        {props.touched.lastname && props.errors.lastname && (
                          <Error msg={props.errors.lastname}></Error>
                        )}
                      </div>
                      <div className="field">
                        <label>Correo</label>
                        <input
                          type="text"
                          disabled="disabled"
                          className="u-full-width"
                          placeholder="correo@algo.com"
                          name="email"
                          onChange={props.handleChange}
                          value={props.values.email}
                        />
                        {props.touched.email && props.errors.email && (
                          <Error msg={props.errors.email}></Error>
                        )}
                      </div>
                      <div className="field">
                        <label>Dirección de envío</label>
                        <input
                          type="text"
                          className="u-full-width"
                          placeholder="Dirección"
                          name="address"
                          onChange={props.handleChange}
                          value={props.values.address}
                        />
                        {props.touched.address && props.errors.address && (
                          <Error msg={props.errors.address}></Error>
                        )}
                      </div>
                      <div className="field">
                        <label>Referencias, entre calles</label>

                        <TextareaAutosize
                          className="u-full-width"
                          placeholder={`Referencias, entre calles`}
                          name="references"
                          rows={4}
                          onChange={props.handleChange}
                          value={props.values.references}
                        />
                        {props.touched.references &&
                          props.errors.references && (
                            <Error msg={props.errors.references}></Error>
                          )}
                      </div>
                      <div className="field">
                        <label>Phone</label>
                        <input
                          type="text"
                          className="u-full-width"
                          placeholder="Teléfono"
                          name="phone"
                          onChange={props.handleChange}
                          value={props.values.phone}
                        />
                        {props.touched.phone && props.errors.phone && (
                          <Error msg={props.errors.phone}></Error>
                        )}
                      </div>

                      <div className="field-checks">
                        <ul>
                          <li>
                            <label
                              className={`check-tags 
                                  ${checkAccept ? "active" : ""}`}
                            >
                              <strong>
                                <input
                                  name="acceptTerms"
                                  type="checkbox"
                                  onClick={() => saveCheckAccept(!checkAccept)}
                                  onChange={props.handleChange}
                                  value={props.values.acceptTerms}
                                />
                              </strong>
                              <span>
                                Declaro que he leído y acepto las Condiciones de
                                Venta y la Política de Privacidad{" "}
                              </span>
                            </label>
                          </li>
                        </ul>
                        {props.touched.acceptTerms &&
                          props.errors.acceptTerms && (
                            <Error msg={props.errors.acceptTerms}></Error>
                          )}
                      </div>
                      {loader ? (
                        <Loader />
                      ) : (
                        <div className="btns-block4">
                          <Link
                            href={
                              shoppingRoute ? `/catalogo/${shoppingRoute}` : "/"
                            }
                          >
                            <a className="btn-primary btn-color-1 btn-size-3 icon-arrow-left">
                              Continuar comprando
                            </a>
                          </Link>
                          <button
                            type="submit"
                            className="btn-primary  btn-size-1"
                            value="enviar"
                          >
                            Comprar
                          </button>
                        </div>
                      )}
                    </form>
                  );
                }}
              </Formik>
            </section>
            <div className="col">
              <div className="resume-table-bottom">
                <div className="info-block resume-data">
                  <h3>
                    Subtotal{" "}
                    <strong>
                      {" "}
                      <NumberFormat
                        value={totalItems}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />{" "}
                    </strong>
                  </h3>
                  <h4>
                    Precio de envio <span>$ {SHIPMENT_VALUE}</span>
                  </h4>
                  <h2>
                    Total{" "}
                    <strong>
                      {" "}
                      <NumberFormat
                        value={totalItems + SHIPMENT_VALUE}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />{" "}
                    </strong>
                  </h2>
                </div>

                <div className="info-block  info-delivery">
                  <div className="description-box">
                    <div className="box-title extra-mg">
                      <h3>FECHA DE ENTREGA</h3>
                    </div>
                    <p>
                      La entrega se llevará a cabo dentro de los{" "}
                      <strong>2 siguientes dias habiles</strong> apartir del
                      momento de su compra. Transcurrido este período, se
                      cancelará el pedido y se le reembolsará el importe pagado
                      automáticamente.
                    </p>
                    <p>
                      Por favor, no dude en contactar con el Servicio de
                      Atención al Cliente, que estará encantado de resolver sus
                      dudas en el teléfono: +78 402 150 868.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ProductError msgResp={msgResp} />
      </section>
    </Layout>
  );
};

export default PrivateRoute(Checkout);
