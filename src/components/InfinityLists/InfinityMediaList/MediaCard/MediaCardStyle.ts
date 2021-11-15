import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled(Link)`
    position: relative;
    margin-bottom: 3rem;
    overflow: hidden;
    cursor: pointer;
`;

export const MediaWrapper = styled.div`
    width: 100%;
    overflow: hidden;
`;

export const Image = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 8px;
`;

export const ImageCaption = styled.figcaption``;
