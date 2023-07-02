import React from "react";

import Image from "next/image";

import InterclasLogo from "../../assets/interclas_distintivo.png";
// import UdescLogo from "../../assets/udesc.png";
// import AstroLogo from "../../assets/astro.png";

import { Container, ContainerImages } from "./styles";

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
            {/* <Image src={UdescLogo} alt="Logo Udesc" height={58.37} />
            <Image src={AstroLogo} alt="Espaço astronomia" /> */}
          </ContainerImages>
        </div>
      </div>
    </Container>
  );
};
