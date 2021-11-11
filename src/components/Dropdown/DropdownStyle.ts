import styled from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    right: 0;
    width: 100%;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    box-shadow: var(--box-shadow-1);
    border-radius: 12px;
    padding: 1.5rem;
    transform: translateY(1rem);
    background: #fff;
    min-width: 20rem;
    z-index: 2;
`;

export const DropdownList = styled.ul``;

export const DropdownListItem = styled.li`
    padding: 1rem 1.5rem;
    transition: all 0.5s;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
        background: var(--light-1);
    }

    a {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--gray-2);

        svg {
            --size: 1.6rem;
            width: var(--size);
            height: var(--size);
        }

        p {
            font-size: 1.2rem;
            font-weight: 500;
        }
    }
`;
