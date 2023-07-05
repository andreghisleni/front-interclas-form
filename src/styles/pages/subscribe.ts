import { shade } from "polished";
import styled from "styled-components";

export const Color = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;

export const ContainerValues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  height: 496px;
  margin-top: 24px;

  background: ${(props) => props.theme.colors.form.light.input.bg};
  border-radius: 10px;

  iframe {
    width: 100%;

    height: 500px;
    border-radius: 10px;
  }

  > img {
    width: 100%;
    overflow-y: auto;
    border-radius: 8px;
    border-radius: 10px;
  }

  &.new {
    padding: 20px;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    border-radius: 0 8px 0 8px;
    margin: 0;

    z-index: 2;

    background: ${(props) => props.theme.colors.primary};

    color: #fff;

    svg {
      width: 40px;
      height: 40px;
    }

    &:hover {
      cursor: pointer;

      background: ${(props) => shade(0.1, props.theme.colors.primary)};
    }

    &:disabled {
      cursor: not-allowed;
      background: ${(props) => shade(0.2, props.theme.colors.primary)};
    }
  }
  h2 {
    margin-top: 16px;
  }
`;
