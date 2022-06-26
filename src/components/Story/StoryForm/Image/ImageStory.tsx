import { ChangeEvent, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useTranslation } from "react-i18next";

// talons
import { useUpload } from "@talons/useUpload";

// icons
import { BsCardImage } from "react-icons/bs";

//styles
import classes from "./imageStory.module.css";
import { Flex } from "@shared/style/sharedStyle.style";

interface Props {
  onCancel: () => void;
  onSubmit: (data: string) => void;
  setLoading: (loading: boolean) => void;
}

const ImageStory = ({ onCancel, onSubmit, setLoading }: Props) => {
  const { t } = useTranslation();

  const [file, setFile] = useState<File | null>(null);
  const [textBoxCounter, setTextBoxCounter] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { editor, onReady } = useFabricJSEditor();
  const { uploadMedia } = useUpload();

  const deleteSelections = () => {
    let deletedTextBoxCounter = 0;
    editor?.canvas.getActiveObjects().forEach((object) => {
      deletedTextBoxCounter += object?.type === "textbox" ? 1 : 0;
      editor?.canvas.remove(object);
    });
    setTextBoxCounter(Math.max(0, textBoxCounter - deletedTextBoxCounter));
  };

  const onAddText = () => {
    try {
      editor?.canvas.add(
        new fabric.Textbox(`${t("typeSomething")} ...`, {
          fill: "#000",
          fontSize: 20,
          fontFamily: "Arial",
          fontWeight: "bold",
          textAlign: "center",
          name: "my-text",
        })
      );
      setTextBoxCounter((v) => v + 1);
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
        const canvasWidth = editor?.canvas.getWidth() || 0;
        const canvasHeight = editor?.canvas.getHeight() || 0;
        editor?.canvas.add(img);
        const obj = editor?.canvas.getObjects();

        obj?.forEach((o) => {
          if (o.type === "image" && o.height && o.width) {
            o.selectable = false;
            o.scaleToHeight((canvasWidth || 100) * 0.8);
            o.scaleToHeight((canvasHeight || 100) * 0.8);
          }
        });
        editor?.canvas.centerObject(img);
        setIsSubmitted(true);
      });
    }
  };

  const onChangeTextColor = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e?.target?.value;
    editor?.canvas.getActiveObjects().forEach((object) => {
      if (object.type === "textbox") {
        object.set("fill", color);
      }
    });
    editor?.canvas.renderAll();
  };

  const saveToServer = async () => {
    if (file) {
      setLoading(true);
      const image = await uploadMedia(file);
      if (!image) {
        setLoading(false);
        return;
      }
      const obj = editor?.canvas.getObjects();
      obj?.forEach((o: any) => {
        if (o.type === "image") {
          o.setSrc(image, () => {
            const objects = editor?.canvas.toJSON();
            if (objects) {
              onSubmit(JSON.stringify(objects));
            } else {
              setLoading(false);
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
            <button className={classes.addTextBtn} onClick={onAddText}>
              {t("addText")}
            </button>
            <button
              className={classes.deleteSelections}
              onClick={deleteSelections}
            >
              {t("deleteSelections")}
            </button>
            {textBoxCounter > 0 && (
              <div className={classes.textColorForm}>
                <label
                  htmlFor="image-story-text-color"
                  className={classes.textColorLabel}
                >
                  {t("textColor")}
                </label>
                <input
                  className={classes.textColorInput}
                  type="color"
                  id="image-story-text-color"
                  onChange={onChangeTextColor}
                />
              </div>
            )}
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
                <p>{t("uploadImage")}</p>
              </label>
            </div>
          )}
          <FabricJSCanvas className={classes.canvas} onReady={onReady} />
        </div>
      </Flex>
      <div className={classes.btnGroup}>
        <button
          className={classes.saveBtn}
          onClick={saveToServer}
          disabled={!isSubmitted}
        >
          {t("save")}
        </button>
        <button className={classes.cancelBtn} onClick={onCancel}>
          {t("cancel")}
        </button>
      </div>
    </div>
  );
};

export default ImageStory;
