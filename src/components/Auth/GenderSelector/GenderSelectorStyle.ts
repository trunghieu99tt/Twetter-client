import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    z-index: 2;
`;

export const Gender = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    gap: .8rem;
    align-items: center;
    cursor: pointer;
    padding: 1rem;
    border: var(--border-1);
    
  
    svg{
        --size: 1.6rem;
        width: var(--size);
        height: var(--size);
    }
    
`;

export const GenderText = styled.p``;

export const GenderIcon = styled.div``;

export const GenderDropdown = styled.div``;

export const GenderSelectionItem = styled.div`
    font-size: 1.2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    
    svg{
        --size: 1.6rem;
        width: var(--size);
        height: var(--size);
    }
    
`;