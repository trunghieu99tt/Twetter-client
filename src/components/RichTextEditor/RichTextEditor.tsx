// talons
import { useRichTextEditor } from "./useRichTextEditor";

// utils
import mergeClasses from "@utils/mergeClasses";

// components
import CustomLinkPreview from "@components/CustomLinkPreview";

// icons
import { BsTrash } from "react-icons/bs";

// styles
import defaultClasses from "./richTextEditor.module.css";

interface Props {
    classes?: any;
    value: string;
    isEdit: boolean;
    onChangeValue: (value: string) => void;
}

const RichTextEditor = ({
    classes: propsClasses,
    onChangeValue,
    value,
    isEdit,
}: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { urls, onChange, removeLinks } = useRichTextEditor({
        value,
        isEdit,
        onChangeValue,
    });

    return (
        <article className={classes.root}>
            <textarea
                value={value}
                onChange={onChange}
                className={classes.textarea}
                placeholder="What's on your mind?"
            ></textarea>
            {urls?.length > 0 && (
                <div className={classes.linkPreviewWrapper}>
                    <button
                        className={classes.removeLinkBtn}
                        onClick={removeLinks}
                    >
                        <BsTrash />
                    </button>
                    <CustomLinkPreview url={urls[0]} />
                </div>
            )}
        </article>
    );
};

export default RichTextEditor;
