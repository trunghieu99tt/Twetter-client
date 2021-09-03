import { iTweet } from "@type/tweet.types";
import React from "react";

import { Image, ImageCaption, ImageWrapper, Wrapper } from "./MediaCardStyle";

interface Props {
    data: iTweet;
}

const MediaCard = ({ data }: Props) => {
    return (
        <Wrapper>
            <ImageWrapper>
                <Image src={data?.media?.[0]} alt={data?.content} />
                <ImageCaption>
                    <span>{data?.content}</span>
                </ImageCaption>
            </ImageWrapper>
        </Wrapper>
    );
};

export default MediaCard;
