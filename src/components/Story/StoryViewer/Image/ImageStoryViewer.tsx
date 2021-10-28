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

type TSize = {
    width: number;
    height: number;
};

const calcScaleFactor = (initialSize: TSize, currSize: TSize) => {
    // Determine width and height scale ratios
    const widthRatio = currSize.width / initialSize.width;
    const heightRatio = currSize.height / initialSize.height;
    return (widthRatio + heightRatio) / 2;
};

const ImageStoryViewer = ({ data, classes: propClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propClasses);

    const { editor, onReady } = useFabricJSEditor();

    useEffect(() => {
        if (data && editor) {
            const canvasWidth = editor?.canvas.getWidth();
            const canvasHeight = editor?.canvas.getHeight();

            const initialSize = {
                width: 400,
                height: 400,
            };

            const factor = calcScaleFactor(initialSize, {
                width: canvasWidth,
                height: canvasHeight,
            });

            editor?.canvas.loadFromJSON(data, () => {
                const objects = editor?.canvas.getObjects();

                for (let i = 0; i < objects.length; i++) {
                    if (objects[i]) {
                        const scaleX = objects[i]?.scaleX || 0;
                        const scaleY = objects[i]?.scaleY || 0;
                        const left = objects[i]?.left || 0;
                        const top = objects[i]?.top || 0;

                        const tempScaleX = scaleX * factor;
                        const tempScaleY = scaleY * factor;
                        const tempLeft = (left * factor) / 2;
                        const tempTop = (top * factor) / 2;

                        objects[i].scaleX = tempScaleX;
                        objects[i].scaleY = tempScaleY;
                        objects[i].left = tempLeft;
                        objects[i].top = tempTop;

                        objects[i].setCoords();
                    }
                }

                // // change url of image object
                // const obj = editor?.canvas.getObjects();
                // obj?.forEach((o: any) => {
                //     if (o.type === "image") {
                //         o.scaleToWidth(canvasWidth * 0.8 || 100);
                //         o.scaleToHeight(canvasHeight * 0.8 || 100);
                //         o.set({
                //             top: 0,
                //             left: 0,
                //             // scaleY: canvasHeight / o.height,
                //             // scaleX: canvasWidth / o.width,
                //         });
                //         editor?.canvas.centerObject(o);
                //     } else {
                //         // editor?.canvas.centerObject(o);
                //         // o.moveToFront();
                //     }
                // });
                // editor?.canvas.requestRenderAll();
                editor?.canvas.renderAll();
                editor?.canvas.calcOffset();
            });
            // const ratio = 0.8;
            // editor?.canvas.setDimensions({
            //     width: canvasWidth * ratio,
            //     height: canvasHeight * ratio,
            // });
            // editor?.canvas.setZoom(ratio);
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
