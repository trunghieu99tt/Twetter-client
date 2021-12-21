import styled from "styled-components";

export const Wrapper = styled("form")<{
    shouldIndent?: boolean;
}>`
    ${(props) =>
        !props.shouldIndent
            ? ""
            : "transform: translateX(4rem); width: 94%;margin: 1rem 0;"}
    display: flex;
    gap: 1.6rem;
`;

export const InputWrapper = styled.div`
    background: #fafafa;
    border: 1px solid #f2f2f2;
    border-radius: 0.8rem;
    flex: 1;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    gap: 1rem;
`;

export const Input = styled.input`
    border: none;
    outline: none;
    height: 100%;
    font-size: 1.4rem;
    color: var(--gray-4);
    width: 95%;
    background: #fafafa;
    padding: 0.75rem 0;
`;

export const FileInput = styled.input`
    display: none;
`;

export const FileInputLabel = styled.label`
    cursor: pointer;

    svg {
        --size: 1.5rem;
        width: var(--size);
        height: var(--size);
    }
`;

export const CommentImageWrapper = styled.div`
    position: relative;
    height: 10rem;
    margin-top: 1rem;
`;

export const CommentMedia = styled.div`
    height: 10rem;
    max-width: 20rem;
`;

export const CommentImageCancelButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;

    svg {
        --size: 1.5rem;
        width: var(--size);
        height: var(--size);
    }
`;

export const InputLoading = styled.div``;

export const EmojiDivStyled = styled.div``;
