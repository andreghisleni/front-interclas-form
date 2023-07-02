import React from "react";

import { Container } from "./styles";

interface IScheduleItem {
  clock: string;
  text: string;
  complement?: string;
  border?: boolean;
}

export const ScheduleItem: React.FC<IScheduleItem> = ({
  clock,
  text,
  complement = undefined,
  border = undefined,
}) => {
  return (
    <Container className={border ? "border" : "a"}>
      <span>{clock}</span>
      <div>
        <strong>{text}</strong>
        {complement && <p>{complement}</p>}
      </div>
    </Container>
  );
};
