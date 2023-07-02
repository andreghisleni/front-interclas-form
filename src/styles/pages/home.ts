import styled from "styled-components";

export const ContainerImages = styled.div`
  width: 100%;
  margin-top: 20px;

  @media (max-width: 1200px) {
    padding-left: 30px;
    ul {
      li {
        width: 370px;
      }
    }
  }
  @media (max-width: 400px) {
    padding-left: 30px;
    ul {
      li {
        width: 300px;
      }
    }
  }
  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  }
  li {
    width: 270px;

    margin-bottom: 20px;
    img {
      object-fit: cover;
    }
  }
`;
