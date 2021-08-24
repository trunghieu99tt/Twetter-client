import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    gap: 6rem; 
`

export const List = styled.div`
    display: flex;
    align-items: center;
    gap: 4.5rem;
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
