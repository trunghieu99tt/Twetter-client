import styled from "styled-components";

export const Wrapper = styled.div`
    background: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Main = styled.div`
    display: flex;
    max-width: 70%;
    max-height: 50rem;
    border-radius: .8rem;
    overflow: hidden;
`;

export const Left = styled.div`
    width: 50%;
`;

export const AuthCoverPhoto = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Right = styled.div`
    background: #fff;
    flex: 1;
`;

export const Heading = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
`