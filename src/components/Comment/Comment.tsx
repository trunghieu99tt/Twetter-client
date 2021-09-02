// styles
import UserAvatarSmall from "@components/UserAvatarSmall";
import { iComment } from "@type/comments.types";
import { AiOutlineHeart } from "react-icons/ai";

import {
    AuthorName,
    Content,
    CreatedAt,
    Interaction,
    LikeButton,
    LikeCounter,
    Main,
    MainInfo,
    Wrapper,
} from "./CommentStyle";

interface Props {
    data: iComment;
    level?: number;
}

const Comment = ({ data, level = 0 }: Props) => {
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
                </MainInfo>
                <Interaction>
                    <LikeButton>
                        <AiOutlineHeart />
                        Like
                    </LikeButton>
                    <span>.</span>
                    <LikeCounter>
                        {data?.likes?.length}{" "}
                        {data?.likes?.length === 1 ? " Like" : " Likes"}
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
