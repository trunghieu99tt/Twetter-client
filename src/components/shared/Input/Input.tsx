import mergeClasses from "@utils/mergeClasses";
import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";

import defaultClasses from "./input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  classes?: any;
  value?: string | number;
  icon?: string;
  invalid?: boolean;
  filter?: RegExp | undefined;
  onChange?: (el?: any, value?: any) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      classes: propsClasses,
      icon = undefined,
      filter = undefined,
      onChange,
      ...otherProps
    },
    ref
  ) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (
        !filter ||
        (event?.target?.value && filter.test(event.target.value))
      ) {
        onChange && onChange(event);
      }
    };

    return (
      <div className={classes.wrapper}>
        {icon && <div className={classes.icon}>{icon}</div>}
        <input
          {...otherProps}
          onChange={handleChange}
          ref={ref}
          className={classes.input}
        />
      </div>
    );
  }
);

export default Input;
