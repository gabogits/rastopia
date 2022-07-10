import React, { useEffect, useContext, useState } from "react";

import Link from "next/link";

import Layout from "./../components/layout/Layout";

import Loader from "../components/templates/Loader";

import { PrivateRoute } from "./../components/routes/PrivateRoute";
import NumberFormat from "react-number-format";

const Checkout = () => {
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
              <div className="section-format-head">
                <div className="box-title">
                  <h2>ACERCA DE </h2>
                </div>
              </div>

              <div className="info-block ">
                <div className="description-box">
                  <div className="box-title extra-mg">
                    <h3>QUIENES SOMOS</h3>
                  </div>
                  <p>
                    La entrega se llevará a cabo dentro de los{" "}
                    <strong>2 siguientes dias habiles</strong> apartir del
                    momento de su compra. Transcurrido este período, se
                    cancelará el pedido y se le reembolsará el importe pagado
                    automáticamente.
                  </p>
                  <p>
                    Por favor, no dude en contactar con el Servicio de Atención
                    al Cliente, que estará encantado de resolver sus dudas en el
                    teléfono: +78 402 150 868.
                  </p>
                </div>
              </div>
              <div className="info-block ">
                <div className="description-box">
                  <div className="box-title extra-mg">
                    <h3>CONTACTO</h3>
                  </div>
                  <p>
                    La entrega se llevará a cabo dentro de los{" "}
                    <strong>2 siguientes dias habiles</strong> apartir del
                    momento de su compra. Transcurrido este período, se
                    cancelará el pedido y se le reembolsará el importe pagado
                    automáticamente.
                  </p>
                  <p>
                    Por favor, no dude en contactar con el Servicio de Atención
                    al Cliente, que estará encantado de resolver sus dudas en el
                    teléfono: +78 402 150 868.
                  </p>
                </div>
              </div>
              <div className="info-block ">
                <div className="description-box">
                  <div className="box-title extra-mg">
                    <h3>OTRA COSA</h3>
                  </div>
                  <p>
                    La entrega se llevará a cabo dentro de los{" "}
                    <strong>2 siguientes dias habiles</strong> apartir del
                    momento de su compra. Transcurrido este período, se
                    cancelará el pedido y se le reembolsará el importe pagado
                    automáticamente.
                  </p>
                  <p>
                    Por favor, no dude en contactar con el Servicio de Atención
                    al Cliente, que estará encantado de resolver sus dudas en el
                    teléfono: +78 402 150 868.
                  </p>
                </div>
              </div>
            </section>
            <div className="col">
              <div className="resume-table-bottom">
                <div className="info-block  info-delivery">
                  <div className="description-box">
                    <div className="box-title extra-mg">
                      <h3>ENTREGAS</h3>
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
      </section>
    </Layout>
  );
};

export default PrivateRoute(Checkout);
