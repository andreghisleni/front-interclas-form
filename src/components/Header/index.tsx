import React from "react";

import Image from "next/image";

import InterclasLogo from "../../assets/interclas_distintivo.png";
// import UdescLogo from "../../assets/udesc.png";
// import AstroLogo from "../../assets/astro.png";

import {
  Container,
  ContainerImages,
  ContainerNavigation,
  ContentMenu,
} from "./styles";
import { Color } from "../../styles/pages/subscribe";
import { Link } from "./Link";

export const Header: React.FC = () => {
  return (
    <Container>
      <div className="container">
        <div className="row">
          <ContainerImages>
            <Image
              src={InterclasLogo}
              alt="Distintivo Interclãs"
              height={160}
            />
            <div>
              <h1>
                <Color>IV INTERCLÃS</Color>
              </h1>
              <h2>
                <Color>Chapecó/SC 19 e 20/08/2023</Color>
              </h2>
            </div>
            <Image
              src={InterclasLogo}
              alt="Distintivo Interclãs"
              height={160}
            />
            {/* <Image src={UdescLogo} alt="Logo Udesc" height={58.37} />
            <Image src={AstroLogo} alt="Espaço astronomia" /> */}
          </ContainerImages>
        </div>
        <div className="row">
          <ContainerNavigation>
            <ContentMenu>
              <ul>
                <Link href="/">Home</Link>
                {/* <Link href="/subscribe">Inscreva-se</Link> */}
              </ul>
            </ContentMenu>
            <div className="divider" />
          </ContainerNavigation>
        </div>
      </div>
    </Container>
  );
};
