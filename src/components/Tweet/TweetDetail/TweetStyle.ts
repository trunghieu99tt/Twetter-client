import { Link } from "react-router-dom";
import styled from "styled-components";

export const RetweetedBy = styled(Link)`
    margin-bottom: 1rem;
    margin-left: 2rem;
    display: flex;
    font-size: 14px;
    color: var(--gray-1);
    gap: 1rem;
    align-items: center;
`;

export const Wrapper = styled.div`
    background: #fff;
    box-shadow: var(--box-shadow-1);
    border-radius: .5rem;
    padding: 2rem;
    margin: 0 auto;
    margin-bottom: 3.5rem;
    max-width: 75rem;
`;

export const Header = styled.header`
    position: relative;
`;

export const AuthorWrapper = styled.div`
   display: flex;
   gap: 2rem;
   margin-bottom: 2rem;
`;

export const AuthorName = styled.h4`
    font-weight: 600;
    font-size: 1.6rem;
`;

export const DateCreated = styled.p`
    color: var(--gray-4);
    font-weight: 500;
`;

export const DropdownButton = styled.button`
    cursor: pointer;
`;

export const AuthorActions = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 2;
`;

export const AuthorAction = styled.button`
    border: none;
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const Content = styled.div``;

export const TweetDescription = styled.div`
font-size: 1.5rem;
color: var(--gray-2);
margin-bottom: 2rem;
`;

export const TweetMediaWrapper = styled.div``;

export const TweetMedia = styled.div`
height: 40rem;
object-fit: contain;
border-radius: .8rem;
`;

export const Interaction = styled.div`
    margin: 1rem 0;
`;

export const InteractionSummary = styled.div`
    display: flex;
    gap: 1.6rem;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: .8rem;
`;

export const InteractionSummaryItem = styled.div`
    color: var(--gray-4);
    font-size: 1.2rem;
    font-weight: 500;
`;

export const InteractionButtonGroup = styled.div`
    border-top: 1px solid var(--light-1);
    border-bottom: 1px solid var(--light-1);
    padding: .4rem 0;
    display: flex;
    justify-content: space-between;
`;

export const InteractionButton = styled('button') <{
    customStyle?: string;
    liked?: boolean;
    saved?: boolean;
    retweeted?: boolean;
}>`
    cursor: pointer;
    padding: 1.1rem 4rem;
    border-radius: .8rem;
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    
    ${(props) => props.liked && `
        color: var(--red);
    `}
    
    ${(props) => props.saved && `
        color: var(--blue-2);
    `}

    ${(props) => props.retweeted && `
        color: var(--green-2);
    `}
    
    &:hover{
        background: var(--light-1);
    }
`;

export const CommentsWrapper = styled.div`
    margin-top: 1rem;
    padding-top: 2rem;
    border-top: 1px solid var(--light-1);
`;