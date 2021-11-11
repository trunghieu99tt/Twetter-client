import { useEffect } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

// utils
import mergeClasses from "@utils/mergeClasses";

// styles
import defaultClasses from "./imageStoryViewer.module.css";

interface Props {
    data: any | null;
    classes?: any;
}

const ImageStoryViewer = ({ data, classes: propClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propClasses);

    const { editor, onReady } = useFabricJSEditor();

    useEffect(() => {
        if (data && editor) {
            const canvasWidth = editor?.canvas.getWidth();
            const canvasHeight = editor?.canvas.getHeight();

            editor?.canvas.loadFromJSON(data, () => {
                // change url of image object
                const obj = editor?.canvas.getObjects();
                obj?.forEach((o: any) => {
                    if (o.type === "image") {
                        o.scaleToHeight((canvasWidth || 100) * 0.8);
                        o.scaleToHeight((canvasHeight || 100) * 0.8);
                        editor?.canvas.centerObject(o);
                    }
                });
                editor?.canvas.requestRenderAll();
                editor?.canvas.renderAll();
                editor?.canvas.calcOffset();
            });
        }
    }, [editor, data]);

    return (
        <div
            style={{
                display: data ? "block" : "none",
                width: "100%",
                height: "100%",
            }}
        >
            <FabricJSCanvas className={classes.canvas} onReady={onReady} />
        </div>
    );
};

export default ImageStoryViewer;
