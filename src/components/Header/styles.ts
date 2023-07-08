import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;
export const ContainerImages = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  max-height: 154px;

  @media (max-width: 700px) {
    /* justify-content: center; */

    /* div {
      display: none;
    } */
    img {
      display: none;
    }
    img:first-child {
      display: block;
      width: 100px;
      height: 100px;
    }
  }
  @media (max-width: 500px) {
    justify-content: center;

    /* div {
      display: none;
    } */
    img {
      display: none;
    }
    img:first-child {
      display: none;
    }
  }
`;
export const ContainerNavigation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;

  margin-bottom: 15px;

  .divider {
    background: ${(props) => props.theme.colors.divider};

    width: 100%;
    height: 0.1px;
  }
`;
export const ContentMenu = styled.nav`
  ul {
    @media (max-width: 700px) {
      flex-direction: column;
    }
    display: flex;
    flex-direction: row;
    li {
      height: 43px;
      a {
        display: flex;
        align-items: center;

        text-transform: uppercase;
        padding: 10px 20px;

        text-decoration: none;
      }
      &.active {
        a {
          color: ${(props) => props.theme.colors.primary};
          font-weight: 500;
        }
      }
    }
  }
`;
