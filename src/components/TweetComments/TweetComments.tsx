import Comment from "@components/Comment";
import { useComment } from "@talons/useComment";
import { useUser } from "@talons/useUser";
import { iComment } from "@type/comments.types";
import React from "react";
import styled from "styled-components";

export const CommentsWrapper = styled.div`
    margin-top: 1rem;
    padding-top: 2rem;
    border-top: 1px solid var(--light-1);
`;

interface Props {
    tweetId: string;
}

const TweetComments = ({ tweetId }: Props) => {
    const { user } = useUser();
    const { getTweetCommentsQuery } = useComment({
        tweetId,
        userId: user?.id || "",
    });

    const { data, isLoading, fetchNextPage } = getTweetCommentsQuery;

    const pages = data?.pages;
    const totalRecords = pages?.[0].total || 0;

    const commentsData: iComment[] =
        pages?.reduce(
            (res: iComment[], curr: { data: iComment[]; total: number }) => [
                ...res,
                ...curr.data,
            ],
            []
        ) || [];

    return (
        <CommentsWrapper>
            {commentsData?.map((comment: iComment) => {
                return <Comment data={comment} />;
            })}
            {totalRecords > commentsData.length && (
                <button onClick={() => fetchNextPage()}>
                    Load more comments
                </button>
            )}
        </CommentsWrapper>
    );
};

export default TweetComments;
