import DefaultUnknownAvatar from "@images/user.png";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Image = styled("img")<{
  customStyles?: string;
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) => props.customStyles}
`;

interface Props {
  src: string;
  alt: string;
  defaultSrc?: any;
  customStyles?: string;
}

const ImageWithPlaceholder = ({
  alt,
  defaultSrc = DefaultUnknownAvatar,
  customStyles,
  src: propsSrc,
}: Props): JSX.Element => {
  const [src, setSrc] = useState<any>(propsSrc);

  useEffect(() => {
    const image = document.createElement("img");
    image.src = src;
    image.onerror = () => {
      setSrc(defaultSrc);
    };
  }, [defaultSrc]);

  return <Image src={src} alt={alt} customStyles={customStyles}></Image>;
};

export default ImageWithPlaceholder;
