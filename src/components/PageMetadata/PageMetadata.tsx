import React from "react";

import { Helmet } from "react-helmet-async";

interface Props {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

const PageMetadata = ({ title, description, image, url }: Props) => {
    return (
        <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {image && <meta property="og:image" content={image} />}
            {url && <meta property="og:url" content={url} />}
        </Helmet>
    );
};

export default PageMetadata;
