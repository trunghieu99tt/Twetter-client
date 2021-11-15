import { LinkPreview } from "@dhaiwat10/react-link-preview";
import mergeClasses from "@utils/mergeClasses";
import { BiError } from "react-icons/bi";

import defaultClasses from "./customLinkPreview.module.css";

interface Props {
    classes?: any;
    url: string;
}

const CustomLinkPreview = ({ classes: propClasses, url }: Props) => {
    const classes = mergeClasses(defaultClasses, propClasses);

    const LinkNotFound = () => {
        return (
            <div className={defaultClasses.linkNotFound}>
                <p> Link not found!</p>
                <BiError />
            </div>
        );
    };

    return (
        <LinkPreview
            fallback={<LinkNotFound />}
            url={url}
            className={classes.linkPreview}
        />
    );
};

export default CustomLinkPreview;
