import styled, { css } from "styled-components";

interface IContainerProps {
  total: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;

  ${(props) =>
    props.total &&
    css`
      h2 {
        color: ${props.theme.colors.primary};
        font-weight: bold;
        font-size: 2rem;
      }
    `}
`;
