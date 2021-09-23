import mergeClasses from "@utils/mergeClasses";
import React from "react";
import { SRLWrapper } from "simple-react-lightbox";

// utils

// styles
import defaultClasses from "./roomimagegallery.module.css";

interface Props {
    classes?: object;
    images: string[];
}

const RoomImageGallery = ({ classes: propsClasses, images }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <aside className={classes.root}>
            <p className={classes.heading}>Shared Image</p>
            <SRLWrapper>
                <div className={classes.content}>
                    {images.map((image: string) => {
                        return (
                            <figure className={classes.itemWrapper} key={image}>
                                <img
                                    src={image}
                                    alt={image}
                                    className={classes.item}
                                />
                            </figure>
                        );
                    })}
                </div>
            </SRLWrapper>
        </aside>
    );
};

export default RoomImageGallery;
