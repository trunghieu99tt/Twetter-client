import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
`;

export const Audience = styled.div`
    color: var(--blue-1);
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    gap: .8rem;
    align-items: center;
    cursor: pointer;
  
    svg{
        --size: 1.6rem;
        width: var(--size);
        height: var(--size);
    }
    
`;

export const AudienceText = styled.p``;

export const AudienceIcon = styled.div``;

export const AudienceDropdown = styled.div``;

export const AudienceSelectionItem = styled.div`
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