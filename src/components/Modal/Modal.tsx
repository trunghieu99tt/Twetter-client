import React from "react";

// styles
import {
    Body,
    CancelButton,
    Footer,
    Header,
    Main,
    Mask,
    OkButton,
    Wrapper,
} from "./ModalStyle";

interface Props {
    isOpen: boolean;
    body?: React.ReactNode;
    header?: React.ReactNode;
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;

    onOk?: () => void;
    onCancel?: () => void;
}

const Modal = ({
    isOpen,
    okText,
    cancelText,
    onOk,
    onCancel,
    body,
    header,
}: Props) => {
    return (
        <Wrapper isOpen={isOpen}>
            <Mask onClick={onCancel} />
            <Main>
                <Header>{header}</Header>
                <Body>{body}</Body>
                <Footer>
                    <OkButton onClick={onOk}>{okText || "OK"}</OkButton>
                    <CancelButton onClick={onCancel}>
                        {cancelText || "Cancel"}
                    </CancelButton>
                </Footer>
            </Main>
        </Wrapper>
    );
};

export default Modal;
