import React from "react";
import MediaViewer from "@components/MediaViewer";

import { MediaWrapper, Wrapper } from "./MediaCardStyle";

interface Props {
    data: any;
}

const MediaCard = ({ data }: Props) => {
    console.log(`data`, data);
    return (
        <Wrapper>
            <MediaWrapper>
                <MediaViewer media={data.media} />
            </MediaWrapper>
        </Wrapper>
    );
};

export default MediaCard;
