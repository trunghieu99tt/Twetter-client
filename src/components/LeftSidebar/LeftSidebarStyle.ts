import styled from "styled-components";

export const Wrapper = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 2rem;
    padding-left: 0;
    width: 30rem;
`;

export const List = styled.ul``;

export const ListItem = styled('li') <{ active: boolean }>`

    margin-bottom: 1.8rem;
    padding: 0.5rem 2rem;
    position: relative;
    
    ${props => props.active && `
        &::before{
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            width: 3px;
            background: var(--blue-1);
            height: 100%;
            border-radius: 0px 8px 8px 0px;
        }
    `}

    a {
        font-weight: 600;
        font-size: 1.4rem;
        color: ${props => props.active ? 'var(--blue-1)' : 'var(--gray-1)'};
        
    }

`;