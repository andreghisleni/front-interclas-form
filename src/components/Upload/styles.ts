import styled, { css } from "styled-components";

interface UploadProps {
  isDragActive: boolean;
  isDragReject: boolean;
  isFocused: boolean;
  refKey?: string;
  [key: string]: any;
  type?: "error" | "success" | "default";
}

export const DropContainer = styled.div.attrs({
  className: "dropzone",
})/*eslint-disable-line*/ <UploadProps>`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 1.5px dashed #969cb3;
  border-radius: 5px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props) =>
    props.isDragActive &&
    css`
      border-color: #12a454;
    `}

  ${(props) =>
    props.isDragReject &&
    css`
      border-color: #e83f5b;
    `}

  &:hover {
    border-color: #5636d3;
  }

  img {
    width: 106px;
  }
`;

const messageColors = {
  default: "#5636D3",
  error: "#e83f5b",
  success: "#12a454",
};

export const UploadMessage = styled.p<UploadProps>`
  display: flex;
  font-size: 16px;
  line-height: 24px;
  padding: 48px 0;

  color: ${({ type }: UploadProps) => messageColors[type || "default"]};

  justify-content: center;
  align-items: center;
`;
