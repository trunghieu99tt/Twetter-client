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
    LikeCounter,
    Interaction,
    CommentMedia,
} from "./CommentStyle";
import MediaViewer from "@components/MediaViewer";

interface Props {
    data: iComment;
    level?: number;
}

const Comment = ({ data, level = 0 }: Props) => {
    const likeCount = data?.likes?.length || 0;

    return (
        <Wrapper shouldIndent={level <= 1}>
            <UserAvatarSmall user={data?.author} />
            <Main>
                <MainInfo>
                    <div>
                        <AuthorName>{data?.author?.name}</AuthorName>
                        <CreatedAt>
                            {new Date(data?.createdAt).toLocaleString()}
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
                <Interaction>
                    <LikeButton>
                        <AiOutlineHeart />
                        Like
                    </LikeButton>
                    <span>.</span>
                    <LikeCounter>
                        {likeCount} {likeCount === 1 ? " Like" : " Likes"}
                    </LikeCounter>
                </Interaction>
            </Main>

            {/* <RepliesWrapper>
                {data?.replies?.map((reply: any) => {
                    return <Comment data={reply} level={level + 1} />;
                })}
            </RepliesWrapper> */}
        </Wrapper>
    );
};

export default Comment;
