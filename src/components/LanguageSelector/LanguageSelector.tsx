import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// talons
import { useToggle } from "@hooks/useToggle";
import { useLanguage } from "@talons/useLanguage";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

// utils
import mergeClasses from "../../utils/mergeClasses";

// images
import USFlag from "@images/Us_flag.png";
import ViFlag from "@images/Vi_flag.png";

// styles
import defaultClasses from "./languageSelector.module.css";

interface Props {
  classes?: Record<string, any>;
}

type LanguageObj = {
  title: string;
  lang: string;
  icon: any;
};

const langList: LanguageObj[] = [
  {
    title: "English",
    lang: "en",
    icon: USFlag,
  },
  {
    title: "Tiếng Việt",
    lang: "vi",
    icon: ViFlag,
  },
];

const LanguageSelector = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const langSelectionRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { lang, changeLang } = useLanguage();
  const { visible, onToggle, onHide } = useToggle();

  useOnClickOutside(langSelectionRef, () => onHide());

  const imgSrc = langList.find((e: LanguageObj) => e.lang === lang)?.icon;

  return (
    <div className={classes.root} ref={langSelectionRef}>
      <button className={classes.curr} onClick={onToggle}>
        <img
          className={classes.icon}
          src={imgSrc}
          alt={`${lang} flag`}
          loading="lazy"
          key={lang}
        />
        {langList.find((e: LanguageObj) => e.lang === lang)?.title}
      </button>
      <AnimatePresence>
        {visible && (
          <motion.ul
            className={classes.list}
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transformOrigin: "top right",
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
          >
            {langList &&
              langList.length > 0 &&
              langList.map((langObj: LanguageObj, idx: number) => {
                return (
                  <li
                    className={classes.listItem}
                    key={`lang-selection-${idx}`}
                  >
                    <button onClick={() => changeLang(langObj.lang)}>
                      <img
                        className={classes.icon}
                        src={langObj.icon}
                        alt="US flag"
                      />
                      {langObj.title}
                    </button>
                  </li>
                );
              })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
