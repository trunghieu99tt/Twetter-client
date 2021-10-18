import mergeClasses from "@utils/mergeClasses";
import defaultClasses from "./textStory.module.css";

interface Props {
    data: any;
    classes?: any;
}

const TextStoryViewer = ({ data, classes: propsClasses }: Props) => {
    const { background, text } = data;
    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <div
            className={classes.root}
            style={{
                background: `${background}`,
            }}
        >
            <div className={classes.text}>{text}</div>
        </div>
    );
};

export default TextStoryViewer;
