import React from "react";

import { Container } from "./styles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: Boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...rest
}) => {
  return (
    <Container type="button" {...rest}>
      {loading ? "Carregando..." : children}
    </Container>
  );
};
