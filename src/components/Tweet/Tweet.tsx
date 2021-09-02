import { useRef, useState } from "react";
import { Link } from "react-router-dom";

// talons
import { useQueryClient } from "react-query";
import { useTweet } from "@talons/useTweet";

// hooks
import { useOnClickOutside } from "@hooks/useOnClickOutside";

// components
import { Spinner1 } from "@components/Loaders";
import Dropdown from "@components/Dropdown";
import AddComment from "@components/AddComment";
import { Carousel } from "react-responsive-carousel";
import UserAvatarSmall from "@components/UserAvatarSmall";

// icons
import { FiRefreshCw } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BiComment, BiBookmark, BiDotsVertical } from "react-icons/bi";

// types
import { iTweet } from "@type/tweet.types";

// styles
import {
    Header,
    Wrapper,
    Content,
    TweetMedia,
    AuthorName,
    DateCreated,
    Interaction,
    AuthorAction,
    AuthorWrapper,
    AuthorActions,
    DropdownButton,
    TweetDescription,
    TweetMediaWrapper,
    InteractionButton,
    InteractionSummary,
    InteractionSummaryItem,
    InteractionButtonGroup,
} from "./TweetStyle";

// types and constants
import { iUser } from "@type/user.types";
import { USER_QUERY } from "constants/user.constants";
import TweetComments from "@components/TweetComments";

type Props = {
    tweet: iTweet;
};

const Tweet = ({ tweet }: Props) => {
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
    const currentUser: iUser | undefined = useQueryClient().getQueryData(
        USER_QUERY.GET_ME
    );
    const { deleteTweetMutation } = useTweet();

    const dropdownRef = useRef() as React.RefObject<HTMLDivElement>;
    const addCommentRef = useRef(null) as React.RefObject<HTMLInputElement>;

    const toggleDropdown = () => setVisibleDropdown((isVisible) => !isVisible);

    const onDeleteTweet = () => {
        console.log(tweet._id);
        deleteTweetMutation.mutate(tweet._id);
    };

    useOnClickOutside(dropdownRef, () => setVisibleDropdown(false));

    const onClickComment = () => {
        if (addCommentRef?.current) {
            addCommentRef.current.focus();
        }
    };

    const isAuthor = currentUser && tweet.author._id === currentUser?._id;

    return (
        <Wrapper>
            {deleteTweetMutation.isLoading && <Spinner1 />}
            <Header>
                <AuthorWrapper>
                    <Link to={`/profile/${tweet.author._id}`}>
                        <UserAvatarSmall user={tweet?.author} />
                    </Link>
                    <div>
                        <Link to={`/profile/${tweet.author._id}`}>
                            <AuthorName>{tweet.author.name}</AuthorName>
                        </Link>
                        <DateCreated>
                            {new Date(tweet.createdAt).toLocaleString("en-US")}
                        </DateCreated>
                    </div>
                </AuthorWrapper>
                {isAuthor && (
                    <AuthorActions ref={dropdownRef}>
                        <DropdownButton onClick={toggleDropdown}>
                            <BiDotsVertical />
                        </DropdownButton>
                        <Dropdown
                            isVisible={visibleDropdown}
                            items={[
                                <AuthorAction onClick={onDeleteTweet}>
                                    <AiOutlineDelete />
                                    Delete
                                </AuthorAction>,
                            ]}
                        ></Dropdown>
                    </AuthorActions>
                )}
            </Header>
            <Content>
                <TweetDescription>{tweet.content}</TweetDescription>
                {tweet?.media?.length > 0 && (
                    <TweetMediaWrapper>
                        <Carousel
                            showArrows={false}
                            showIndicators={tweet?.media?.length > 1}
                            showStatus={tweet?.media?.length > 1}
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
            <AddComment addCommentRef={addCommentRef} tweetId={tweet._id} />
            <TweetComments tweetId={tweet._id} />
        </Wrapper>
    );
};

export default Tweet;
