import { useRef } from "react";

// components
import Comment from "@components/Comment";
import AddComment from "@components/AddComment";
import { Carousel } from "react-responsive-carousel";

// icons
import { FiRefreshCw } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { BiComment, BiBookmark } from "react-icons/bi";

// types
import { iTweet } from "@type/tweet.types";

// styles
import {
    Content,
    Header,
    Wrapper,
    AuthorWrapper,
    AuthorAvatar,
    AuthorName,
    DateCreated,
    TweetDescription,
    TweetMediaWrapper,
    TweetMedia,
    Interaction,
    InteractionSummary,
    InteractionSummaryItem,
    InteractionButton,
    CommentsWrapper,
    InteractionButtonGroup,
} from "./TweetStyle";

import { comments } from "mocks/comment.data";

type Props = {
    tweet: iTweet;
};

const Tweet = ({ tweet }: Props) => {
    const addCommentRef = useRef(null) as React.RefObject<HTMLInputElement>;

    const onClickComment = () => {
        if (addCommentRef?.current) {
            addCommentRef.current.focus();
        }
    };

    return (
        <Wrapper>
            <Header>
                <AuthorWrapper>
                    <AuthorAvatar src={tweet.author.avatar} />
                    <div>
                        <AuthorName>{tweet.author.name}</AuthorName>
                        <DateCreated>
                            {new Date(tweet.createdAt).toLocaleString("en-US")}
                        </DateCreated>
                    </div>
                </AuthorWrapper>
            </Header>
            <Content>
                <TweetDescription>{tweet.content}</TweetDescription>
                {tweet?.media?.length > 0 && (
                    <TweetMediaWrapper>
                        <Carousel
                            showArrows={false}
                            showIndicators={tweet?.media?.length > 1}
                        >
                            {tweet.media.map((media, index) => (
                                <TweetMedia key={index} src={media} />
                            ))}
                        </Carousel>
                    </TweetMediaWrapper>
                )}
                <Interaction>
                    <InteractionSummary>
                        <InteractionSummaryItem>
                            {tweet?.likes?.length || 0} likes
                        </InteractionSummaryItem>
                        <InteractionSummaryItem>
                            {tweet?.comments?.length || 0} comments
                        </InteractionSummaryItem>
                        <InteractionSummaryItem>
                            {tweet?.retweeted?.length || 0} retweeted
                        </InteractionSummaryItem>
                        <InteractionSummaryItem>
                            {tweet?.saved?.length || 0} saved
                        </InteractionSummaryItem>
                    </InteractionSummary>

                    <InteractionButtonGroup>
                        <InteractionButton onClick={onClickComment}>
                            <BiComment />
                            Comment
                        </InteractionButton>
                        <InteractionButton>
                            <FiRefreshCw />
                            Retweet
                        </InteractionButton>
                        <InteractionButton>
                            <FaRegHeart />
                            Like
                        </InteractionButton>
                        <InteractionButton>
                            <BiBookmark />
                            Save
                        </InteractionButton>
                    </InteractionButtonGroup>
                </Interaction>
            </Content>
            <AddComment addCommentRef={addCommentRef} />
            <CommentsWrapper>
                {comments?.map((comment) => (
                    <Comment data={comment} key={comment._id} level={0} />
                ))}
            </CommentsWrapper>
        </Wrapper>
    );
};

export default Tweet;
