import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
    width: 100%;
    margin: 0 auto;
    
    @media (min-width: 576px){
        width: 540px;
    }
    
    @media (min-width: 768px){
        width: 720px;
    }
    
    @media (min-width: 992px){
        width: 960px;
    }
    
    @media (min-width: 1200px){
        width: 1140px;
    }
    
    // @media (min-width: 1400px){
    //     width: 1320px;
    // }
  
`;

export const Flex = styled('div') <
    {
        gap?: string;
        justify?: string;
        align?: string;
    }
    >`
    display: flex;
    ${({ gap }) => gap && `gap: ${gap}`};
    ${({ align }) => align && `align-items: ${align};`}
    ${({ justify }) => justify && `justify-content: ${justify}`};
`;

export const boundUpDown = keyframes`
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    50% {
        -webkit-transform: translateY(20px);
        transform: translateY(20px);
    }
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
`;