import React from "react";
import Head from "next/head";
import { Color } from "../styles/pages/subscribe";
import { ListContainer } from "../styles/pages/home";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home | Interclãs Form</title>
      </Head>

      <main>
        <section className="callaction">
          <div className="container">
            <div className="row">
              <h1>
                <Color>Informativos</Color>
              </h1>
            </div>
            <div className="row">
              <ListContainer>
                <li>
                  <a
                    href="https://drive.google.com/file/d/1KveOGBwVtanRwxuYlMSexTCW3e2xENd2/view?usp=drive_link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Primeiro Informativo Interclãs 2023
                  </a>
                </li>
              </ListContainer>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
