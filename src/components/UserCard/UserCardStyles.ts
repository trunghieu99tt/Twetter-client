import styled from "styled-components";

export const Wrapper = styled.article`
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-bottom: 1px solid var(--gray-5);
    padding: 2rem;
`;

export const UserName = styled.p`
    font-size: 1.6rem;
`;

export const UserFollowers = styled.p`
    font-size: 12px;
    color: var(--gray-1);
`;

export const FollowButton = styled.button`
    background: var(--blue-1);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 2.4rem;
    height: 3rem;
    border-radius: .4rem;
`;

export const UserBio = styled.p`
    font-size: 14px;
    color: var(--gray-1);
`;