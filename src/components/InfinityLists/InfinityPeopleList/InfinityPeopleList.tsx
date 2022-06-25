import React from "react";
import TweetSkeleton from "@components/Tweet/TweetDetail/TweetSkeleton";
import UserCard from "@components/UserCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { iUser } from "@type/user.types";
import { UserService } from "services/user.service";

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
        ...curr.data.map(UserService.parseUser),
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
          <UserCard user={user} key={`infinity-user-list-${user._id}`} />
        ))}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default InfinityPeopleList;
