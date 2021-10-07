import { boundUpDown } from "@shared/style/sharedStyle.style";
import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    width: 28rem;
    padding: 1.5rem;
    z-index: 2;
    bottom: 5rem;
    right: 5rem;
    border-radius: 10px;
`;

export const ChatListWrapper = styled('div') <{
    isOpen: boolean;
}>`
    transform: translate(-30%, -25%) scale(${props => (props.isOpen ? 1 : 0)});
    position: absolute;
    bottom: 0;
    max-height: 20rem;
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    width: 25rem;
    transform-origin: bottom right;
    transition: all 0.1s ease-in-out;
`;

export const Heading = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2;
    border-bottom: var(--border-1);
`;

export const ChatUserListItem = styled.article`
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: .5rem;
    
    &:hover{
        background: var(--light-1);
    }
    
`
    ;



export const ToggleChatButton = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;
    border: 1.5rem solid var(--blue-1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${boundUpDown} 3s ease-in-out infinite;

    svg {
        --size: 2rem;
        width: var(--size);
        height: var(--size);
    }
    
`;



export const ChatUserListItemName = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
`;

export const ChatBoxList = styled.div`
    position: fixed;
    bottom: 0.5rem;
    right: 10rem;
    display: flex;
    gap: 1rem;
`;