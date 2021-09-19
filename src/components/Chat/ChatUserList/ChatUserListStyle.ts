import styled from "styled-components";

export const Wrapper = styled.div`
    position: fixed;
    top: 6.6rem;
    right: 0;
    max-width: 300px;
    width: 28rem;
    height: calc(100% - 6.6rem);
    background: #fff;
    padding: 1.5rem;
    overflow: auto;
    z-index: 2;
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