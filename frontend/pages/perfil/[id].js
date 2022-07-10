import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import NumberFormat from "react-number-format";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { getFullDate } from "../../helpers/";
import Layout from "../../components/layout/Layout";
import { PrivateRoute } from "./../../components/routes/PrivateRoute";
import useAuth from "../../context/authState";
import Loader from "../../components/templates/Loader";
const GET_ORDERS_USER = gql`
  query($id: ID!) {
    getOrdersByClient(id: $id) {
      id
      order {
        id
        name
        quantity
        size
        photos {
          photo
        }
      }
      client {
        id
        address
        name
        lastname
        phone
      }
      total
      delivery
      status
    }
  }
`;

const Profile = () => {
  const router = useRouter();
  const { user, idUser } = useAuth();
  const {
    query: { id },
  } = router;

  const { data, loading, error, startPolling, stopPolling } = useQuery(
    GET_ORDERS_USER,
    {
      variables: {
        id,
      },
    }
  );

  useEffect(() => {
    startPolling(1000); //con startPolling detecta un cambio, pasa un segundo y trae los datos. Es como un socket
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return  <Loader />;

  if (!data) {
    return "aun no hay datos";
  }

  const { getOrdersByClient } = data;
  if (!getOrdersByClient) {
    return "aun no hay datos";
  }
  console.log(getOrdersByClient);
  //
  return (
    <Layout>
      <section className="orders top-bottom-space gray-back-1 ">
        <div className="container">
          <div className="box-title">
            <h2>Tus pedidos</h2>
          </div>
          <div className="table-list">
            <div>
              <ol className="table-head cols-5">
                <li>
                  <strong>Pedido</strong>
                </li>

                <li>
                  <strong>Entrega </strong>
                </li>

                <li>  <strong>Detalles </strong></li>
                <li>
                  <strong>Total</strong>
                </li>
                <li>
                  <strong>Estatus </strong>
                </li>
              </ol>

              {getOrdersByClient.map((order) => (
                <ul key={order.id} className="table-content  cols-5">
                  <li>
                    <div className="cell">
                      <strong>Pedido</strong>
                      <span> {order.id}</span>
                    </div>
                  </li>

                  <li>
                    <div className="cell">
                      <strong>Entrega</strong>
                      <span>{getFullDate(order.delivery)} </span>
                    </div>
                  </li>
                  <li>
                  <ul>
                    {order.order.map((item) => (
                      <li key={item.id} className="item-list">
                    
                        <figure className="item-list-img">
                          <Link
                            href="/producto/[id]"
                            as={`/producto/${item.id}`}
                          >
                            <CloudinaryContext cloudName="chabelita">
                              <Image publicId={item.photos[0].photo}>
                                <Transformation
                                  width="200"
                                  crop="scale"
                                  
                                />
                              </Image>
                            </CloudinaryContext>
                          </Link>
                        </figure>

                        <div className="item-list-txt">
                          <div className="item-list-col-1">
                            <h3>
                              {" "}
                              <Link
                                href="/producto/[id]"
                                as={`/producto/${item.id}`}
                              >
                                {item.name}
                              </Link>
                            </h3>
                            <p>Cantidad {item.quantity}</p>
                          </div>
                          <div className="item-list-col-2">
                            <p>Talla {item.size}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                      </ul>
                  </li>
                  <li>
                    <div className="cell">
                      <strong>Total</strong>
                      <span>
                        {" "}
                        <NumberFormat
                          value={order.total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />{" "}
                      </span>
                    </div>
                  </li>

                  <li>
                    <div className="cell">
                      <strong>Estatus</strong>
                      <span  className="color-red">{order.status}</span>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivateRoute(Profile);
