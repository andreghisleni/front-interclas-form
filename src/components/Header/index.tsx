import React from "react";

import Image from "next/image";

import InterclasLogo from "../../assets/interclas_distintivo.png";
// import UdescLogo from "../../assets/udesc.png";
// import AstroLogo from "../../assets/astro.png";

import { Container, ContainerImages } from "./styles";
import { Color } from "../../styles/pages/subscribe";

export const Header: React.FC = () => {
  return (
    <Container>
      <div className="container">
        <div className="row">
          <ContainerImages>
            <Image
              src={InterclasLogo}
              alt="Distintivo Interclas"
              height={160}
            />
            <div>
              <h1>
                <Color>IV INTERCLÃS</Color>
              </h1>
              <h2>
                <Color>Chapecó-Sc 19 e 20/08/2021</Color>
              </h2>
            </div>
            <Image
              src={InterclasLogo}
              alt="Distintivo Interclas"
              height={160}
            />
            {/* <Image src={UdescLogo} alt="Logo Udesc" height={58.37} />
            <Image src={AstroLogo} alt="Espaço astronomia" /> */}
          </ContainerImages>
        </div>
      </div>
    </Container>
  );
};
