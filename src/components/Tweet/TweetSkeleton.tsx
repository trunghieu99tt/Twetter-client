// components
import Skeleton from "react-loading-skeleton";

// styles
import {
    Wrapper,
    Content,
    Interaction,
    CommentsWrapper,
    TweetDescription,
    TweetMediaWrapper,
} from "./TweetStyle";
import { Flex } from "@shared/style/sharedStyle.style";

const TweetSkeleton = () => {
    return (
        <Wrapper>
            <Flex gap="2rem">
                <Skeleton height="5rem" width="5rem" />
                <div
                    style={{
                        flex: 1,
                    }}
                >
                    <Skeleton height="2rem" />
                    <Skeleton height="2rem" />
                </div>
            </Flex>
            <Content>
                <TweetDescription>
                    <Skeleton height="5rem" />
                </TweetDescription>
                <TweetMediaWrapper>
                    <Skeleton height="40rem" />
                </TweetMediaWrapper>
                <Interaction>
                    <Skeleton height="3rem" />
                    <Skeleton height="3rem" />
                </Interaction>
            </Content>
            <Skeleton height="5rem" />
            <CommentsWrapper>
                {[...Array(3)].map((_, i) => (
                    <Skeleton
                        key={`tweet-skeleton-comment-${i}`}
                        height="3rem"
                    />
                ))}
            </CommentsWrapper>
        </Wrapper>
    );
};

export default TweetSkeleton;
