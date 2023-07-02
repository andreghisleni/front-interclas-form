import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  background: ${(props) => props.theme.colors.primary};
  height: 56px;
  border-radius: 28px;
  border: 0;
  line-height: 21px;
  padding: 0 16px;
  color: ${(props) => props.theme.colors.background};
  width: 100%;
  max-width: 250px;

  font-weight: 500;

  transition: background-color 0.2s;

  text-transform: uppercase;

  &:hover {
    cursor: pointer;
    background: ${(props) => shade(0.6, props.theme.colors.primary)};
  }
  &:disabled,
  &[disabled] {
    opacity: 0.5;
  }
`;
