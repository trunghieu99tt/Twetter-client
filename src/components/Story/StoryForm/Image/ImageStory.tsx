import React, { ChangeEvent, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import classes from "./imageStory.module.css";
import { BsCardImage } from "react-icons/bs";
import { Flex } from "@shared/style/sharedStyle.style";
import { useUpload } from "@talons/useUpload";
import { Object } from "fabric/fabric-impl";

interface Props {
    onCancel: () => void;
    onSubmit: (data: string) => void;
}

const ImageStory = ({ onCancel, onSubmit }: Props) => {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const { editor, onReady } = useFabricJSEditor();
    const { uploadImage } = useUpload();

    const deleteSelections = () => {
        editor?.canvas.getActiveObjects().forEach((object) => {
            editor?.canvas.remove(object);
        });
    };

    const onAddText = () => {
        try {
            editor?.canvas.add(
                new fabric.Textbox("Type something...", {
                    fill: "red",
                    fontSize: 20,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    textAlign: "center",
                    name: "my-text",
                })
            );
            editor?.canvas.renderAll();
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file && file.type.match(/image.*/)) {
            setFile(file);
            fabric.Image.fromURL(URL.createObjectURL(file), function (img) {
                const canvasWidth = editor?.canvas.getWidth();
                const canvasHeight = editor?.canvas.getHeight();
                editor?.canvas.add(img);
                const obj = editor?.canvas.getObjects();
                obj?.forEach((o) => {
                    if (o.type === "image") {
                        o.selectable = false;
                        o.scaleToHeight(canvasWidth || 100);
                        o.scaleToHeight(canvasHeight || 100);
                    }
                });

                editor?.canvas.centerObject(img);
                setIsSubmitted(true);
            });
        }
    };

    const saveToServer = async () => {
        if (file) {
            const image = await uploadImage(file);

            const canvasWidth = editor?.canvas.getWidth();
            const canvasHeight = editor?.canvas.getHeight();

            // change url of image object
            const obj = editor?.canvas.getObjects();
            obj?.forEach((o: any) => {
                if (o.type === "image") {
                    o.setSrc(image, () => {
                        o.scaleToWidth(canvasWidth || 100);
                        o.scaleToHeight(canvasHeight || 100);
                        o.set("dirty", true);
                        editor?.canvas.requestRenderAll();
                        const objects = editor?.canvas.toJSON();
                        if (objects) {
                            onSubmit(JSON.stringify(objects));
                        }
                    });
                }
            });
        }
    };

    return (
        <div className={classes.root}>
            <Flex gap="5rem" justify="center" align="center">
                {isSubmitted && (
                    <aside className={classes.aside}>
                        <button
                            className={classes.addTextBtn}
                            onClick={onAddText}
                        >
                            Add Text
                        </button>
                        <button
                            className={classes.deleteSelections}
                            onClick={deleteSelections}
                        >
                            Delete selections
                        </button>
                    </aside>
                )}

                <div className={classes.main}>
                    {!isSubmitted && (
                        <div className={classes.imageForm}>
                            <input
                                type="file"
                                onChange={onChange}
                                style={{
                                    display: "none",
                                }}
                                id="imageFormInput"
                            />
                            <label
                                htmlFor="imageFormInput"
                                className={classes.imageFormLabel}
                            >
                                <BsCardImage />
                                <p>Upload Image</p>
                            </label>
                        </div>
                    )}
                    <FabricJSCanvas
                        className={classes.canvas}
                        onReady={onReady}
                    />
                </div>
            </Flex>
            <div className={classes.btnGroup}>
                <button
                    className={classes.saveBtn}
                    onClick={saveToServer}
                    disabled={!isSubmitted}
                >
                    Save
                </button>
                <button className={classes.cancelBtn} onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ImageStory;
