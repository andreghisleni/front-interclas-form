import React, { useMemo } from "react";

import { Container } from "./styles";

interface IShowValueProps {
  label: string;
  value: number;
  total?: boolean;
}

export const ShowValue: React.FC<IShowValueProps> = ({
  label,
  value,
  total = false,
}) => {
  const parsedValue = useMemo(() => {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }, [value]);
  return (
    <Container total={total}>
      <h2>{label}</h2>
      <h2>{parsedValue}</h2>
    </Container>
  );
};
