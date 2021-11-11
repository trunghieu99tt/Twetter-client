import React from "react";

// utils
import mergeClasses from "@utils/mergeClasses";

// types
import { TMedia } from "@type/app.types";

// styles
import defaultClasses from "./mediaViewer.module.css";

interface Props {
    media: TMedia;
    classes?: any;
}

const MediaViewer = ({ media, classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const isImage = media.type === "image";

    return (
        <article className={classes.root}>
            {(isImage && (
                <img
                    className={classes.media}
                    src={media.url}
                    alt={media.url}
                />
            )) || (
                <video
                    src={media.url}
                    className={classes.media}
                    controls
                    muted
                    autoPlay
                    loop
                />
            )}
        </article>
    );
};

export default MediaViewer;
