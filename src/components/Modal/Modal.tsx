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
    okText?: React.ReactNode;
    header?: React.ReactNode;
    cancelText?: React.ReactNode;
    customHeaderStyles?: string;

    onOk?: () => void;
    onCancel?: () => void;
}

const Modal = ({
    body,
    header,
    isOpen,
    okText,
    cancelText,

    onOk,
    onCancel,

    customHeaderStyles,
}: Props) => {
    return (
        <Wrapper isOpen={isOpen}>
            <Mask onClick={onCancel} />
            <Main>
                <Header customHeaderStyles={customHeaderStyles}>
                    {header}
                </Header>
                <Body>{body}</Body>
                {onOk && onCancel && (
                    <Footer>
                        <OkButton onClick={onOk}>{okText || "OK"}</OkButton>
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
