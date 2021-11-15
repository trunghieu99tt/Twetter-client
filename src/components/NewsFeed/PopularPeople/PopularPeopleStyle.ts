import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div``;

export const UserCard = styled.article`
    padding-bottom: 2rem;
    
    &:not(:last-child){
        border-bottom: 1px solid var(--gray-5);
        margin-bottom: 2.5rem;
    }
`;

export const UserName = styled(Link)`
    font-size: 1.4rem;
    font-weight: 500;
`;

export const UserFollowers = styled.p`
    font-size: 1.2rem;
    color: var(--gray-1);
`;

export const FollowButton = styled.button`
    cursor: pointer;
    background: var(--blue-1);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.4rem 1.4rem;
    border-radius: .4rem;
    justify-self: flex-end;
`;

export const UserBio = styled.p`
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--gray-1);
    margin: 2rem 0;
`;

export const UserCoverPhoto = styled.img`
    height: 7.7rem;
    border-radius: .8rem;
    width: 100%;
    object-fit: cover;
`;