import React from "react";

import Head from "next/head";

import { GetStaticProps } from "next";
import { Color } from "../styles/pages/subscribe";
import { api } from "../services/api";
import { Card, CardsContainer } from "../styles/pages/metrics";

export interface IMetrics {
  inscriptions: number;
  members: {
    total: number;
    types: {
      senior: number;
      motorista: number;
      mestre: number;
      pioneiro: number;
    };
  };
}

const Metrics: React.FC<{
  metrics: IMetrics;
}> = ({ metrics }) => {
  return (
    <>
      <Head>
        <title>Métricas formulário | Interclãs Form</title>
      </Head>

      <main>
        <section className="callaction">
          <div className="container">
            <div className="row">
              <h1>
                <Color>Métricas das inscrições</Color>
              </h1>
            </div>
            <CardsContainer>
              <Card>
                <div>
                  <header>Total De Clãs inscritos</header>
                  <h2>{metrics.inscriptions}</h2>
                </div>
              </Card>
              <Card>
                <div>
                  <header>Total De Membros Inscritos</header>
                  <h2>{metrics.members.total}</h2>
                </div>
              </Card>
              <Card>
                <div>
                  <header>Total De Pioneiros Inscritos</header>
                  <h2>{metrics.members.types.pioneiro}</h2>
                </div>
              </Card>

              <Card>
                <div>
                  <header>Total De Seniores Inscritos</header>
                  <h2>{metrics.members.types.senior}</h2>
                </div>
              </Card>
              <Card>
                <div>
                  <header>Total De Mestres Inscritos</header>
                  <h2>{metrics.members.types.mestre}</h2>
                </div>
              </Card>
              <Card>
                <div>
                  <header>Total De Motoristas Inscritos</header>
                  <h2>{metrics.members.types.motorista}</h2>
                </div>
              </Card>
            </CardsContainer>
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const getMetrics = await api.get("/inscriptions/count");

  return {
    props: {
      metrics: getMetrics.data,
    },
    revalidate: 15,
  };
};

export default Metrics;
