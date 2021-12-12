import React from "react";
import MediaViewer from "@components/MediaViewer";

import { MediaWrapper, Wrapper } from "./MediaCardStyle";

interface Props {
    data: any;
}

const MediaCard = ({ data }: Props) => {
    return (
        <Wrapper to={`/tweet/${data._id}`}>
            <MediaWrapper>
                <MediaViewer media={data.media} />
            </MediaWrapper>
        </Wrapper>
    );
};

export default MediaCard;
