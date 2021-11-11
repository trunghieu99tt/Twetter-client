import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 6rem; 
    
    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        max-width: 300px;
        background: #fff;
        width: 200px;
        height: 100vh;
        z-index: 1;
        display: block;
        padding-top: 3rem;
    }
    
`

export const List = styled.div`
    display: flex;
    align-items: center;
    gap: 4.5rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
    }
    
`;


export const Item = styled("li") <{
    active: boolean
}>`
    position: relative;
    padding: 1.5rem;
    
    ${props => props.active && `
        &::after{
            content: ' ';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 3px;
            background: var(--blue-1);
            width: 100%;
            border-radius: 8px 8px 0px 0px;
        }
    `}

    & a {
        color: ${props => props.active ? "var(--blue-1)" : "var(--gray-1)"};
        font-size: 1.4rem;
        font-weight: ${props => props.active ? "600" : "500"};
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;

    svg{
        --size: 2rem;
        width: var(--size);
        height: var(--size);
    }
`;