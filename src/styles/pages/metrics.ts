import { styled } from "styled-components";

export const CardsContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(5, 1fr);
  grid-gap: 24px;

  align-items: center;

  @media only screen and (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 18px;
  }
  @media only screen and (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
  }

  @media only screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 12px;
  }
`;

export const Card = styled.div`
  margin-top: 40px;

  > div {
    box-sizing: border-box;

    background: ${(props) => props.theme.colors.grayscale.white};
    border: 1px ${(props) => props.theme.colors.grayscale.divider} solid;

    border-radius: 8px;

    padding: 32px 24px;

    &:hover {
      border: 1px ${(props) => props.theme.colors.accent.default} solid;

      header,
      h2 {
        color: ${(props) => props.theme.colors.accent.default};
      }
    }

    transition: 0.2s;

    header {
      font-size: 19px;
      font-family: "Roboto";

      font-style: italic;
      font-weight: 700;
      font-size: 19px;
      line-height: 24px;

      text-align: center;
      letter-spacing: 0.4px;

      color: ${(props) => props.theme.colors.grayscale.gray.light};
    }
    h2 {
      margin-top: 12px;
      width: 194px;
      height: 50px;

      font-family: "Roboto";
      font-weight: 700;
      font-size: 40px;
      line-height: 50px;
      text-align: center;
      letter-spacing: 1px;

      /* grayscale / black */

      color: ${(props) => props.theme.colors.grayscale.black};
    }
  }

  border: 2px solid transparent;

  &:hover {
    border: 2px solid ${(props) => props.theme.colors.accent.light};
    border-radius: 8px;
    cursor: pointer;
  }

  transition: 0.3s;
`;
