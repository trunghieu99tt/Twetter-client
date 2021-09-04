import styled from "styled-components";

export const Root = styled.div`
    position: relative;
    height: 100vh;
    background-color: #222;
`;

export const Main = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    max-width: 500px;
    text-align: center;
`;

export const HeadingContainer = styled.div`
    line-height: 153px;
`;

export const Heading = styled.h1`
    color: #222;
    font-size: 22rem;
    letter-spacing: 10px;
    margin: 0px;
    font-weight: 700;
    text-shadow: 2px 2px 0px #c9c9c9, -2px -2px 0px #c9c9c9;
    
    span{
        text-shadow: 2px 2px 0px #ffab00, -2px -2px 0px #ffab00, 0px 0px 8px #ff8700;
        font-size: inherit;
    }
    
`;

export const Description = styled.p`
    color: #c9c9c9;
    font-size: 16px;
    font-weight: 400;
    margin-top: 0px;
    margin-bottom: 15px;
`;