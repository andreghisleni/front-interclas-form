import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 40px;

  background: ${(props) => props.theme.colors.background};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  width: 100%;
  max-width: 700px;

  @media (max-width: 700px) {
    padding: 20px 30px;

    flex-direction: column;
    align-items: flex-start;

    span {
      display: flex;
      justify-content: center;
      width: 100%;
      border-bottom: 0.5px solid ${(props) => props.theme.colors.divider};
      margin-bottom: 10px;
    }
  }

  &.border {
    border: 0.5px solid #7ca8ed;
  }

  & + div {
    margin-top: 10px;
  }

  span {
    padding: 20px 0;
    @media (min-width: 701px) {
      width: 80px;
      border-right: 0.5px solid ${(props) => props.theme.colors.divider};
    }
  }
  > div {
    @media (min-width: 701px) {
      padding: 0 30px;
    }

    strong {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 30px;

      text-indent: 0;
      padding: 0;
    }
    p {
      font-size: 14px;
      line-height: 30px;

      text-indent: 0;
      padding: 0;
    }
  }
`;
