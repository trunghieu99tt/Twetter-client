import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
    Root,
    Main,
    Heading,
    BackToHome,
    Description,
    HeadingContainer,
} from "./NotFoundStyles";

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <Root>
            <Helmet>
                <title>{t("notFound")}</title>
            </Helmet>
            <Main>
                <HeadingContainer>
                    <Heading>
                        4<span>0</span>4
                    </Heading>
                </HeadingContainer>
                <Description>{t("pageNotFound")}</Description>
                <BackToHome to="/">{t("returnToHomepage")}</BackToHome>
            </Main>
        </Root>
    );
};

export default NotFound;
