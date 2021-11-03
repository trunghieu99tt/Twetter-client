import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

// utils
import mergeClasses from "@utils/mergeClasses";

// styles
import defaultClasses from "./imagemessageform.module.css";

// types
import { iFile } from "@type/message.types";

interface Props {
    classes?: object;
    onSubmit: (event: any) => void;
    onCancel: () => void;
    onChange: (event: any) => void;
    data: iFile;
}

const initState = {
    scale: 0,
    top: "50%",
    left: "50%",
    x: "-50%",
    y: "-50%",
    opacity: 0,
};

const ImageMessageForm = ({
    classes: propsClasses,
    onSubmit,
    onCancel,
    onChange,
    data,
}: Props) => {
    const { t } = useTranslation();

    const classes = mergeClasses(defaultClasses, propsClasses);

    return (
        <AnimatePresence>
            <div className={classes.mask} onClick={onCancel}></div>
            <motion.section
                className={classes.root}
                initial={initState}
                animate={{
                    ...initState,
                    scale: 1,
                    opacity: 1,
                }}
                exit={initState}
                transition={{
                    values: 0.1,
                }}
            >
                <form className={classes.main} onSubmit={onSubmit}>
                    <div className={classes.imageField}>
                        <figure>
                            <img
                                src={data.url}
                                alt=""
                                className={classes.image}
                            />
                        </figure>
                        <p className={classes.fileName}>{data.file?.name}</p>
                        <div className={classes.message}>
                            <label htmlFor="message">{t("message")}</label>
                            <input
                                type="text"
                                name="message"
                                onChange={onChange}
                                required
                                className={classes.input}
                            />
                        </div>
                    </div>

                    <div className={classes.btnGroup}>
                        <button onClick={onCancel}>{t("cancel")}</button>
                        <button type="submit" className={classes.btnSubmit}>
                            {t("upload")}
                        </button>
                    </div>
                </form>
            </motion.section>
        </AnimatePresence>
    );
};

export default ImageMessageForm;
