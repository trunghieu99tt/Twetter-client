import { useLocalStorage } from "@hooks/useLocalStorage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useLanguage = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useLocalStorage("lang", "en");

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang]);

    const changeLang = (lang: string) => {
        setLang(lang);
    };

    return {
        lang,
        changeLang
    };

};

export { useLanguage };