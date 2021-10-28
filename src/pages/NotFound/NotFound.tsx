import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import {
    Root,
    Main,
    HeadingContainer,
    Heading,
    Description,
} from "./NotFoundStyles";

const NotFound = () => {
    return (
        <Root>
            <Helmet>
                <title>Not found</title>
            </Helmet>
            <Main>
                <HeadingContainer>
                    <Heading>
                        4<span>0</span>4
                    </Heading>
                </HeadingContainer>
                <Description>Không tìm thấy trang yêu cầu.</Description>
                <Link to="/">
                    <button>Quay về trang chủ</button>
                </Link>
            </Main>
        </Root>
    );
};

export default NotFound;
