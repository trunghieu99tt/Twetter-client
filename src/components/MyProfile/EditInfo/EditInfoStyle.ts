import styled from "styled-components";

export const Wrapper = styled.div``;

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

