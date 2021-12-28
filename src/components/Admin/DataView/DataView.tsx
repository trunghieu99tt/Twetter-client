import { formatNumber } from "@utils/helper";
import mergeClasses from "@utils/mergeClasses";

// utils

// styles
import defaultClasses from "./dataView.module.css";

// state

interface Props {
    classes?: object;
    data: any;
    params: any;
    title: string;
    exculedFields?: string[];
    onGoBack: () => void;
    onGoToEdit: () => void;
}

const DataView = ({
    classes: propsClasses,
    data,
    title,
    params,
    exculedFields: excludedFields,
    onGoBack,
    onGoToEdit,
}: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    console.log(`data`, data);

    return (
        <div className={classes.root}>
            <h2 className={classes.heading}>{title}</h2>
            <div className={classes.main}>
                <ul className={classes.list}>
                    {data &&
                        Object.entries(data).map(([key, value], idx) => {
                            let viewValue = value;

                            if (
                                key === "password" ||
                                value === null ||
                                value === undefined ||
                                excludedFields?.includes(key)
                            ) {
                                return null;
                            }

                            if (typeof value === "object") {
                                viewValue = (value as { id: number }).id;
                            }

                            if (typeof value === "number") {
                                viewValue = formatNumber(viewValue);
                            }

                            return (
                                <li
                                    className={classes.item}
                                    key={`${title}-${params?.id || ""}-${idx}`}
                                >
                                    <span className={classes.itemTitle}>
                                        {key}
                                    </span>
                                    <span
                                        className={classes.itemValue}
                                    >{`${viewValue}`}</span>
                                </li>
                            );
                        })}
                </ul>
                <div className={classes.footer}>
                    <button className={classes.btn} onClick={onGoToEdit}>
                        Edit
                    </button>
                    <button className={classes.btn} onClick={onGoBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataView;
