import styled from 'styled-components';

export const Wrapper = styled.section`
    margin-top: 2.5rem;
`;

export const Inner = styled.div`
    display: flex;
    gap: 2.5rem;
`;

export const Main = styled.section`
    width: 70%;
    
    @media (max-width: 1024px){
        width: 100%;
    }
    
`;

export const Sidebar = styled.aside`
    flex: 1;
    
    @media (max-width: 1024px){
        display: none;
    }
    
`;

