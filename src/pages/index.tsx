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
        <section className="callaction" style={{ marginBottom: 8 }}>
          <div className="container">
            <div className="row">
              <h1>
                <Color>
                  As inscrições já passaram, o evento já acabou, mas acredito
                  que você perdeu o melhor INTERCLÃS de todos os tempos 😎😁😎😁
                </Color>
              </h1>
            </div>
            <div className="row">
              <h2>
                Mas segue o link das noticias do evento, para você ficar por
                dentro de tudo que rolou no evento.
              </h2>
            </div>
            <div className="row">
              <ListContainer>
                <li>
                  <a
                    href="https://www.gexapeco.com/single-post/cla-pioneiro-desbravador-do-ge-xapeco-realiza-o-ix-interclas"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Noticia do IX INTERCLÃS no site do GEXAPECÓ
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.escoteirossc.org.br/site/index.php/notic/36-2017/884-cla-pioneiro-desbravador-do-ge-xapeco-realiza-o-ix-interclas"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Noticia do IX INTERCLÃS no site dos Escoteiros de Santa
                    Catarina
                  </a>
                </li>
              </ListContainer>
            </div>
          </div>
        </section>
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
