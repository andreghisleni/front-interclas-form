import React from "react";

import { Container } from "./styles";

interface ITooltipProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}
export const Tooltip: React.FC<ITooltipProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};
