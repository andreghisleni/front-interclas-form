import React from "react";

import { Container, Contet } from "./styles";

export const Footer: React.FC = () => {
  return (
    <Container>
      <div>
        <Contet>
          <p>
            Designed by{" "}
            <a href="https://andreg.com.br" target="_blank" rel="noreferrer">
              AGSolutions
            </a>
          </p>
        </Contet>
      </div>
    </Container>
  );
};
