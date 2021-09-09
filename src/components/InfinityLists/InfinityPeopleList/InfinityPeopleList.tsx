import React from "react";

// components
import UserCard from "@components/UserCard";
import TweetSkeleton from "@components/Tweet/TweetSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

// types
import { iUser } from "@type/user.types";
import { parseUser } from "@talons/useUser";

interface Props {
    query: any;
}

const InfinityPeopleList = ({ query }: Props) => {
    const { data, isLoading, fetchNextPage } = query;

    const pages = data?.pages;
    const totalRecords = pages?.[0].total || 0;

    const users: iUser[] =
        pages?.reduce(
            (res: iUser[], curr: { data: iUser[]; total: number }) => [
                ...res,
                ...curr.data.map((user: iUser) => parseUser(user)),
            ],
            []
        ) || [];

    const hasMore = users.length < totalRecords;

    return (
        <React.Fragment>
            {isLoading && users.length === 0 && <TweetSkeleton />}
            <InfiniteScroll
                dataLength={users.length}
                next={fetchNextPage}
                hasMore={hasMore}
                loader={<TweetSkeleton />}
            >
                {users?.map((user: iUser) => (
                    <UserCard
                        user={user}
                        key={`infinity-tweet-list-${user._id}`}
                    />
                ))}
            </InfiniteScroll>
        </React.Fragment>
    );
};

export default InfinityPeopleList;
