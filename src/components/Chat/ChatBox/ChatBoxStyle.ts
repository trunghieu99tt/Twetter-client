import styled from "styled-components";

export const Wrapper = styled.div`
    width: 30rem;
    height: 40rem;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
    border: 1px solid var(--gray-5);
`;

export const Header = styled.header`
    border-bottom: var(--border-1);
    padding: 1rem;
    display: flex;
    gap: 1.5rem;
    align-items: center;
`;

export const UserAvatar = styled.img`
    --size: 3.5rem;
    width: var(--size);
    height: var(--size);
    object-fit: cover;
    border-radius: 50%;
`;

export const UserName = styled.p`
    font-size: 1.2rem;
`;

export const Main = styled.div`
    flex: 1;
    overflow: auto;
    padding: 1rem 0;
`;

export const MessageListWrapper = styled.div`
    height: 29rem;
    overflow: auto;
`;

export const MessageForm = styled.div``;