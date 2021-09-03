import styled from "styled-components";

export const Wrapper = styled('div') <{
    isOpen: boolean;
}>`
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

export const Mask = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const Main = styled.div`
    width: 500px;
    max-width: 70%;
    background: #fff;
`;

export const Header = styled.div``;

export const Body = styled.div``;

export const Footer = styled.div``;

export const OkButton = styled.button``;

export const CancelButton = styled.button``;