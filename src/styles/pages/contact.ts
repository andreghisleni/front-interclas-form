import styled from "styled-components";
import { shade } from "polished";

export const A = styled.a`
  color: ${(props) => props.theme.colors.primary};

  @media (max-width: 550px) {
    font-size: 24px;
  }
  :hover {
    color: ${(props) => shade(0.2, props.theme.colors.primary)};
    font-weight: 400;
  }
`;
