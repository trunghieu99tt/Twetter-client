import styled from "styled-components";

export const Root = styled.div`
    position: absolute;
    bottom: 0;
    transform: translateY(-40%);
    border-radius: 5px;
    overflow: hidden;
    left: 0;
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
`;


export const Button = styled.button`
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
    &:not(:first-of-type){
        margin-left: 1rem;
    }
`;
