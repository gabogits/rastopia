import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { PrivateRoute } from "./../../components/routes/PrivateRoute";
import useAuth from "../../context/authState";
import NumberFormat from "react-number-format";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import Link from "next/link";
import Loader from "../../components/templates/Loader";

const GET_ORDER = gql`
  query ($id: ID!) {
    getOrder(id: $id) {
      id
      order {
        id
        name
        quantity
        price
        size
        photos {
          photo
        }
      }
      client {
        id
        address
        references
        name
        lastname
        phone
        email
      }
      total
      delivery
      status
    }
  }
`;

const EDIT_ORDER = gql`
  mutation editOrder($id: ID!, $input: OrderUpdateInput) {
    editOrder(id: $id, input: $input) {
      id
      delivery
      status
    }
  }
`;

const Order = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(GET_ORDER, {
    variables: {
      id,
    },
  });
  const [orderStatus, changeOrderStatus] = useState("");
  const [editOrder] = useMutation(EDIT_ORDER);
  useEffect(() => {
    if (data) {
      changeOrderStatus(data.getOrder.status);
    }
  }, [data]);
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/");
    }
  }, [user]);
  const changeStatus = async (e) => {
    changeOrderStatus(e.target.value);

    try {
      await editOrder({
        variables: {
          id,
          input: {
            status: e.target.value,
          },
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return <Loader />;

  if (!data) {
    return "aun no hay datos";
  }
  console.log(data);
  const {
    getOrder: { client, order },
  } = data;

  return (
    <Layout>
      <section className="shopping-cart top-bottom-space gray-back-1 ">
        <div
          className="navigation-btn back-btn hide-nav-btn"
          onClick={() => router.back()}
        ></div>
        <div className="container">
          <section className="resume">
            <div className="order-head">
              <div className="box-title">
                <h2>PEDIDO</h2>
              </div>
              <div className="select-small select-size-1 f-right margin-btm c-both">
                <div className="select-simple__container">
                  <select
                    name="orderStatus"
                    value={orderStatus}
                    onChange={changeStatus}
                  >
                    <option value="PENDIENTE"> PENDIENTE</option>
                    <option value="ENVIADO"> ENVIADO</option>
                    <option value="ENTREGADO"> ENTREGADO</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="resume-table-bottom">
              <div className="resume-data">
                <p>
                  ID: <strong> {client.id}</strong>
                </p>
                <p>
                  Nombre:{" "}
                  <strong>
                    {client.name} {client.lastname}
                  </strong>
                </p>
                <p>
                  Phone:<strong>{client.phone} </strong>
                </p>
                <p>
                  Address:<strong>{client.address} </strong>
                </p>
                <p>
                  Referencias:<strong>{client.references} </strong>
                </p>
                <p>
                  Email:<strong>{client.email} </strong>
                </p>
              </div>
            </div>
            <div className="resume-content">
              <div className="resume-table-content">
                {order.map((item) => (
                  <div key={item.id} className="resume-table-item">
                    <ul className="item-bag">
                      <li>
                        <div className="resume-table-1 resume-img">
                          <Link
                            href="/producto/[id]"
                            as={`/producto/${item.id}`}
                          >
                            <CloudinaryContext cloudName="chabelita">
                              <Image publicId={item.photos[0].photo}>
                                <Transformation width="500" crop="scale" />
                              </Image>
                            </CloudinaryContext>
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="resume-table-2 resume-description">
                          <h4>
                            <strong>
                              <Link
                                href="/producto/[id]"
                                as={`/producto/${item.id}`}
                              >
                                {item.name}
                              </Link>
                            </strong>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <p>
                          {" "}
                          <NumberFormat
                            value={item.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$ "}
                          />{" "}
                        </p>
                      </li>
                      <li>
                        <p>Talla {item.size} </p>
                      </li>
                      <li>
                        <div className="resume-table-3 resume-qty">
                          <p>Cantidad {item.quantity} </p>
                        </div>
                      </li>

                      <li></li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default PrivateRoute(Order);
