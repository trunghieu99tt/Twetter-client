import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const CoverPhoto = styled('div') <{ img: string }>`
    background-image: url(${props => props.img});
    background-size: cover;
    background-position: center center;
    height: 35rem;
`;

export const Main = styled.section`
    max-width: 1440px;
    margin: 0 auto;
    background: #fff;
    transform: translateY(-50%);
    padding: 2rem 2.5rem 3.5rem 2.5rem;
    box-shadow: var(--box-shadow-1);
    border-radius: 12px;
    display: flex;
    gap: 2.5rem;
    position: relative;
`;

export const AvatarWrapper = styled.figure`
    --size: 15rem;
    width: var(--size);
    height: var(--size);
    border-radius: .5rem;
    overflow: hidden;
    margin-top: -7.5rem;
    margin-bottom: 1.5rem;
`;

export const Avatar = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Info = styled.div`
    max-width: 50%;
`;

export const MainInfo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    gap: 2.5rem;
    align-items: center;
`;

export const Name = styled.h2`
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3.6rem;
    color: var(--gray-3);
    letter-spacing: 0.5px;
`;

export const FollowersCounter = styled.p`
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: var(--gray-3);
    
    span {
        font-weight: 600;
        color: #000;
        margin-right: 0.5rem;
    }
`;

export const SecondaryInfo = styled.div``;

export const Bio = styled.p`
    color: var(--gray-1);
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.5rem;
`;

export const FollowButton = styled.button`
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
    cursor: pointer;
    background: var(--blue-1);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 2.4rem;
    border-radius: .4rem;
`;