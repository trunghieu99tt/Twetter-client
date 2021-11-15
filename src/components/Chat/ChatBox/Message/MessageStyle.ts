import styled from "styled-components";


export const Content = styled('div')`
    background: var(--gray-5);
    color: #000;
    padding: 1rem;
    border-radius: 5px;
`

export const Wrapper = styled('div') <{
    isAuthor: boolean
}>`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    padding: 0 1rem;
    color: #fff;
    font-size: 1.2rem;
    margin-right: 4rem;
    ${({ isAuthor }) => isAuthor && 'flex-direction: row-reverse; margin-left: 4rem; margin-right: 0;'} 
    
    ${Content} {
        ${({ isAuthor }) => isAuthor && 'background: var(--blue-1);color: #fff'}
    }
`;
