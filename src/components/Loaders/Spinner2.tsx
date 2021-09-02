import styled, { keyframes } from "styled-components";

const animation = keyframes` 
    100%
    {
        transform: rotate(1turn)
    }
`;

const Spinner = styled("div")<{
    customStyles?: string;
}>`
    --size: 50px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: radial-gradient(farthest-side, var(--blue-1) 94%, #0000) top/8px
            8px no-repeat,
        conic-gradient(#fff 30%, var(--blue-1));
    -webkit-mask: radial-gradient(
        farthest-side,
        #0000 calc(100% - 8px),
        #000 0
    );
    animation: ${animation} 1s infinite linear;
    ${(props) => props?.customStyles}
`;

type Props = {
    customStyles?: string;
};

const Spinner2 = ({ customStyles }: Props) => {
    return <Spinner customStyles={customStyles} />;
};

export default Spinner2;
