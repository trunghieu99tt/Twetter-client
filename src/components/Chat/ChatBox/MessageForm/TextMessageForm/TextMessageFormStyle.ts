import styled from "styled-components";

export const Root = styled.div`
    position: relative;
    padding: 5px 15px;
    background: var(--mGray6);
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`;

export const MediaItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    button{
        color: #fff;
    }
    
`;

export const ToggleMediaGroupButton = styled.button`
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    border: 1px solid var(--gray-2);
    height: 2.5rem;
    border-radius: 50%;
    
    &:focus{
        outline: none;
    }
`;

export const TextInputWrapper = styled.div`
    border: 1px solid var(--gray-4);
    max-height: 2.5rem;
    overflow: auto;
    width: 100%;
`;

export const SubmitButton = styled.button`
    --size: 3.5rem;
    width: var(--size);
    height: var(--size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
`;