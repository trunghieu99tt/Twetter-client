import { useTranslation } from "react-i18next";
import { SRLWrapper } from "simple-react-lightbox";

// utils
import mergeClasses from "@utils/mergeClasses";

// styles
import defaultClasses from "./roomimagegallery.module.css";
import { useState } from "react";
interface Props {
    classes?: object;
    images: string[];
}

const RoomImageGallery = ({ classes: propsClasses, images }: Props) => {
    const { t } = useTranslation();
    const [reload, setReload] = useState<number>(0);

    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <aside className={classes.root}>
            <p className={classes.heading}>{t("sharedImage")}</p>
            <SRLWrapper key={Math.random()}>
                <div className={classes.content}>
                    {images.map((image: string) => {
                        return (
                            <figure className={classes.itemWrapper} key={image}>
                                <img
                                    key={Math.random()}
                                    src={image}
                                    alt={image}
                                    className={classes.item}
                                    onError={() => {
                                        if (reload < 5) {
                                            setReload((r) => r + 1);
                                        }
                                    }}
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
