import React from "react";

import Head from "next/head";
import { Color } from "@/styles/pages/subscribe";

const Subscribe: React.FC = () => {
  return (
    <>
      <Head>
        <title>Inscrições | INTERCLÃS Form</title>
      </Head>

      <main>
        <section className="callaction" style={{ marginBottom: 392 }}>
          <div className="container">
            <div className="row">
              <h1>
                <Color>As inscrições já passaram.</Color>
              </h1>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Subscribe;
