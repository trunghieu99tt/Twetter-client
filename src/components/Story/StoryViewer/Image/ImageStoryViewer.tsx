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
            editor?.canvas.loadFromJSON(data, () => {
                const canvasWidth = editor?.canvas.getWidth();
                const canvasHeight = editor?.canvas.getHeight();

                // change url of image object
                const obj = editor?.canvas.getObjects();
                obj?.forEach((o: any) => {
                    if (o.type === "image") {
                        o.scaleToWidth(canvasWidth * 0.8 || 100);
                        o.scaleToHeight(canvasHeight * 0.8 || 100);
                        editor?.canvas.centerObject(o);
                    } else {
                        // o.moveToFront();
                    }
                });

                editor?.canvas.requestRenderAll();
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
