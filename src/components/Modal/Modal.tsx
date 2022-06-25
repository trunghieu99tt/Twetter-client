import Button from "@components/shared/Button";
import React from "react";
import {
  Body,
  CancelButton,
  Footer,
  Header,
  Main,
  Mask,
  Wrapper,
} from "./ModalStyle";

interface Props {
  isOpen: boolean;
  body?: React.ReactNode;
  okText?: React.ReactNode;
  header?: React.ReactNode;
  cancelText?: React.ReactNode;
  customHeaderStyles?: string;
  zIndex?: number;

  onOk?: () => void;
  onCancel?: () => void;
}

const Modal = ({
  body,
  header,
  isOpen,
  okText,
  zIndex,
  cancelText,

  onOk,
  onCancel,

  customHeaderStyles,
}: Props): JSX.Element => {
  return (
    <Wrapper isOpen={isOpen} zIndex={zIndex}>
      <Mask onClick={onCancel} />
      <Main>
        <Header customHeaderStyles={customHeaderStyles}>{header}</Header>
        <Body>{body}</Body>
        {onOk && onCancel && (
          <Footer>
            <Button onClick={onOk}>{okText || "OK"}</Button>
            <CancelButton onClick={onCancel}>
              {cancelText || "Cancel"}
            </CancelButton>
          </Footer>
        )}
      </Main>
    </Wrapper>
  );
};

export default Modal;
