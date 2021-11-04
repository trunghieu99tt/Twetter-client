import styled from "styled-components";

export const Wrapper = styled.div``;

export const EditItemList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

export const EditItem = styled.div`
    margin-bottom: 1rem;
    
    input {
        padding: 1rem;
        border: 1px solid var(--gray-4);
        border-radius: 5px;
        
        &:focus {
            outline: none;
        }
        
    }
    
`;

export const EditItemLabel = styled.label`
    display: block;
    font-size: 1.3rem;
    margin-bottom: 1rem;
`;

export const EditItemInput = styled.input`
    border: 1px solid var(--gray-4);
    padding: 1rem;
    border-radius: .5rem;
`;

export const ToggleUpdatePasswordBtn = styled.button`
    display: block;
    color: var(--red);
    font-weight: 500;
    text-decoration: underline;
    padding-left: 0;
    margin-bottom: .5rem
`;