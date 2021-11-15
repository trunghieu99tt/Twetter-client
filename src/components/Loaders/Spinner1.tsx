import styled, { keyframes } from "styled-components";

const Root = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9999;
`;

const rotate = keyframes`
    100% {
        transform: rotate(1turn)
    }
`;

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    display: grid;
    border: 4px solid #0000;
    border-radius: 50%;
    border-right-color: #25b09b;
    animation: ${rotate} 1s infinite linear;

    &::before,
    &::after {
        content: "";
        grid-area: 1/1;
        margin: 2px;
        border: inherit;
        border-radius: 50%;
        animation: ${rotate} 2s infinite;
        z-index: 9999;
    }

    &::after {
        margin: 0.8rem;
        animation-duration: 3s;
    }
`;

const Spinner1 = () => {
    return (
        <Root>
            <Spinner />
        </Root>
    );
};

export default Spinner1;
