import React, { useContext, useEffect, useState } from "react";
import Layout from "./../components/layout/Layout";
import { gql, useLazyQuery } from "@apollo/client";
import { getFullDate } from "../helpers/";
import Link from "next/link";
import { PrivateRoute } from "./../components/routes/PrivateRoute";
import useAuth from "../context/authState";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import Loader from "../components/templates/Loader";
import ProductContext from "../context/productContext";
const GET_ORDERS = gql`
  query ($input: OrdersFilterInput) {
    getOrders(input: $input) {
      id
      client {
        id
      }
      total
      delivery
      status
    }
  }
`;

const Orders = () => {
  const { user } = useAuth();
  const router = useRouter();
  const {
    saveOrders,
    orders,
    resultsOrders,
    resetOrders,
    selectStatus,
    setSelectStatus,
  } = useContext(ProductContext);

  const [inputFilter, setInputFilter] = useState(null);

  const [moreProducts, { loading, data }] = useLazyQuery(GET_ORDERS, {
    variables: {
      input: inputFilter,
    },
  });

  useEffect(() => {
    if (orders.length === 0 && !data) {
      moreResults();
    }

    if (data && data.getOrders) {
      console.log(data);
      saveOrders(data);
    }
  }, [data, selectStatus]);

  const setValuesFilter = () => {
    let setInput = {};

    const limit = 6;
    setInput.skip = orders.length;
    setInput.limit = limit;
    setInput.status = selectStatus.toUpperCase();

    setInputFilter(setInput);
  };
  const moreResults = async () => {
    setValuesFilter();
    moreProducts();
  };

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user]);

  return (
    <Layout>
      <section className="orders top-bottom-space gray-back-1 ">
        <div className="container">
          <div className="box-title">
            <h2>Pedidos</h2>
          </div>

          <div className="select-small select-size-1 margin-btm c-both">
            <div className="select-simple__container">
              <select
                name="orderStatus"
                value={selectStatus}
                onChange={(e) => {
                  resetOrders();
                  setSelectStatus(e.target.value);
                  moreResults();
                }}
              >
                <option value="PENDIENTE"> PENDIENTES</option>
                <option value="ENVIADO"> ENVIADOS</option>
                <option value="ENTREGADO"> ENTREGADOS</option>
                <option value="TODOS"> TODOS</option>
              </select>
            </div>
          </div>

          <div className="table-list">
            <div>
              <ol className="table-head  cols-6">
                <li>
                  <strong>Pedido</strong>
                </li>
                <li>
                  <strong>Cliente ID</strong>
                </li>

                <li>
                  <strong>Total</strong>
                </li>
                <li>
                  <strong>Entrega </strong>
                </li>
                <li>
                  <strong>Estatus </strong>
                </li>

                <li></li>
              </ol>

              {orders.map((order) => (
                <ul key={order.id} className="table-content   cols-6">
                  <li>
                    <div className="cell">
                      <strong>Pedido</strong>
                      <span> {order.id}</span>
                    </div>
                  </li>
                  <li>
                    <div className="cell">
                      <strong>Cliente ID</strong>
                      <span> {order.client.id}</span>
                    </div>
                  </li>

                  <li>
                    <div className="cell">
                      <strong>Total</strong>
                      <span>
                        <NumberFormat
                          value={order.total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="cell">
                      <strong>Entrega</strong>
                      <span>{getFullDate(order.delivery)} </span>
                    </div>
                  </li>
                  <li>
                    <div className="cell">
                      <strong>Estatus</strong>
                      <span className="color-red">{order.status}</span>
                    </div>
                  </li>
                  <li>
                    <div className="cell">
                      <strong>Detalle</strong>
                      <span>
                        <Link href="/pedido/[id]" as={`/pedido/${order.id}`}>
                          <a className="btn-medium  btn-color-4 btn-size-full">
                            Ver mas
                          </a>
                        </Link>
                      </span>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              {resultsOrders ? (
                <div className="btns-block2">
                  <button
                    className="btn-medium  btn-color-4 btn-size-3"
                    onClick={(e) => {
                      moreResults();
                    }}
                  >
                    Cargar más
                  </button>
                </div>
              ) : (
                <div className="post box-format txt-center">
                  Ya no hay mas resultados
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default PrivateRoute(Orders);
