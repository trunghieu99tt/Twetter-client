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

export const UpdateAvatar = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    display: none;
    width: 100%;
    
    label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        color: #fff;
        background: rgba(0,0,0,.3);
        padding: 1rem;
        cursor: pointer;
        
        svg {
            --size: 1.5rem;
            width: var(--size);
            height: var(--size);
        }
        
    }
    
    input {
        display: none;
    }
`;

export const ChangeAvatarActions = styled.div`
    background: rgba(0,0,0,.4);
    padding: 1rem 0;
    display: flex;
    justify-content: center;
    
    button:disabled{
        cursor: initial;
    }
    
`;

export const CancelChangeAvatarButton = styled.button`
    text-align: center;
    color: #fff;
`;

export const OkChangeAvatarButton = styled.button`
    background: var(--blue-2);
    border-radius: 5px;
    color: #fff;
`;

export const AvatarWrapper = styled.figure`
    --size: 15rem;
    width: var(--size);
    height: var(--size);
    border-radius: .5rem;
    overflow: hidden;
    margin-top: -7.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    
    &:hover ${UpdateAvatar}{
        display: block;
    }
    
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

export const FollowersCounter = styled.button`
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