import mergeClasses from "@utils/mergeClasses";
import React, { ButtonHTMLAttributes } from "react";
import defaultClasses from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: any;
  onClick: (...args: any[]) => void;
  children: React.ReactNode;
}

const Button = ({
  classes: propsClasses,
  onClick,
  children,
  ...rest
}: Props): JSX.Element => {
  const classes = mergeClasses(defaultClasses, propsClasses);
  return (
    <button onClick={onClick} className={classes.root} {...rest}>
      {children}
    </button>
  );
};

export default Button;
