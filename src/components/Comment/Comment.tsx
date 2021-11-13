import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// utils
import { calcDiffTimeString } from "@utils/helper";

// components
import AddComment from "@components/AddComment";
import MediaViewer from "@components/MediaViewer";

// types
import { iComment } from "@type/comments.types";

// icons
import { AiOutlineHeart } from "react-icons/ai";

// styles
import UserAvatarSmall from "@components/UserAvatarSmall";
import {
    Main,
    Content,
    Wrapper,
    MainInfo,
    CreatedAt,
    LikeButton,
    AuthorName,
    ReplyButton,
    LikeCounter,
    Interaction,
    CommentMedia,
    RepliesWrapper,
} from "./CommentStyle";
import { Flex } from "@shared/style/sharedStyle.style";

interface Props {
    data: iComment;
    level?: number;
}

const Comment = ({ data, level = 0 }: Props) => {
    const { t } = useTranslation();

    const likeCount = data?.likes?.length || 0;

    const [shouldShowReplyForm, setShouldShowReplyForm] = useState(false);

    const addCommentRef = useRef(null) as React.RefObject<HTMLInputElement>;

    const onFocusCommentForm = () => {
        if (addCommentRef?.current) {
            setShouldShowReplyForm((v) => !v);
            addCommentRef.current.focus();
        }
    };

    return (
        <Wrapper>
            <Flex>
                <UserAvatarSmall user={data?.author} />
                <Main>
                    <MainInfo>
                        <div>
                            <AuthorName>{data?.author?.name}</AuthorName>
                            <CreatedAt>
                                {calcDiffTimeString(new Date(data?.createdAt))}
                            </CreatedAt>
                        </div>
                        <Content>{data?.content}</Content>
                        {data?.media && (
                            <CommentMedia>
                                <MediaViewer
                                    media={{
                                        url: data.media,
                                        type: data.media.includes("image")
                                            ? "image"
                                            : "video",
                                    }}
                                />
                            </CommentMedia>
                        )}
                    </MainInfo>
                    <Flex gap="1rem">
                        <Interaction>
                            <LikeButton>
                                <AiOutlineHeart />
                                {t("like")}
                            </LikeButton>
                            {likeCount > 0 && (
                                <LikeCounter>
                                    {likeCount}{" "}
                                    {likeCount === 1
                                        ? ` ${t("like")}`
                                        : ` ${t("like")}s`}
                                </LikeCounter>
                            )}
                        </Interaction>
                        {!data?.isChild && (
                            <ReplyButton onClick={onFocusCommentForm}>
                                {t("reply")}
                            </ReplyButton>
                        )}
                    </Flex>
                    <RepliesWrapper>
                        {data?.replies?.map((reply: any) => {
                            return <Comment data={reply} level={level + 1} />;
                        })}
                    </RepliesWrapper>
                </Main>
            </Flex>

            <div
                style={{
                    display: shouldShowReplyForm ? "block" : "none",
                }}
            >
                <AddComment
                    tweet={data.tweet}
                    commentData={data}
                    addCommentRef={addCommentRef}
                />
            </div>
        </Wrapper>
    );
};

export default Comment;
