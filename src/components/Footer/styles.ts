import styled from "styled-components";

export const Container = styled.footer`
  position: relative;
  background: ${(props) => props.theme.colors.footer.background[0]};
  width: 100%;
  height: 150px;

  margin-top: 100px;

  > div {
    position: absolute;
    display: flex;
    justify-content: center;
    background: ${(props) => props.theme.colors.footer.background[1]};
    width: 100%;
    height: 100px;
    bottom: 0;
  }
`;
export const Contet = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  p {
    color: ${(props) => props.theme.colors.text[1]};
    font-size: 14px;
    a {
      color: ${(props) => props.theme.colors.text[2]};
      text-decoration: none;
    }
  }
`;
