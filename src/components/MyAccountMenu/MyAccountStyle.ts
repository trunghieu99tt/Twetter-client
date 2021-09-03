import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
`;

export const AvatarWrapper = styled.figure`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const AvatarCaption = styled.figcaption`
    font-size: 1.2rem;
    font-weight: 600;
`;

export const DropdownButton = styled.button`
    outline: none;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    
    &:focus {
        outline: none;
    }
`;

export const Dropdown = styled.div`
    position: absolute;
    right: 0;
    width: 100%;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    box-shadow: var(--box-shadow-1);
    border-radius: 12px;
    padding: 1.5rem;
    transform: translateY(1rem);
    background: #fff;
`;

export const DropdownList = styled.ul``;

export const DropdownListItem = styled.li`
    padding: 1rem 1.5rem;
    transition: all .5s;
    border-radius: 5px;
    
    &:hover{
        cursor: pointer;
        background: var(--light-1);
    }

    a {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: var(--gray-2);   
        
        svg{
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

export const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--gray-2);
    padding: 0;
`;