import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: var(--box-shadow-1);
  border-radius: 1.2rem;
  padding: 1rem 2rem;
  margin-bottom: 2.5rem;
`;

export const HeadLine = styled.div`
  color: var(--gray-2);
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--gray-5);
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

export const Main = styled.div`
  display: flex;
  gap: 1.2rem;

  & > div {
    flex: 1;
  }
`;

export const TweetContentInputWrapper = styled.div`
  min-height: 10rem;
  margin-bottom: 2rem;
`;

export const TweetContentInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
`;

export const TweetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImageLeftPlaceHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
`;

export const TweetImageWrapper = styled("div")<{
  mode: "block" | "flex" | "grid" | "none";
}>`
  position: relative;
  margin-top: 1rem;
  margin-bottom: 2rem;
  position: relative;

  display: ${(props) => props.mode};

  ${(props) =>
    props.mode === "block" &&
    `
        height: 30rem;
    `};

  ${(props) =>
    props.mode === "flex" &&
    `
        & > img{
            width: 50%;
        }
    `};

  ${(props) =>
    props.mode === "grid" &&
    `
        grid-template-rows: repeat(2, 20rem);
        grid-template-columns: repeat(6, 1fr);
        
        ${TweetImage}:nth-of-type(1){
            grid-row: 1;
            grid-column: 1/span 3;
        }
        
        ${TweetImage}:nth-of-type(2){
            grid-row: 1;
            grid-column: 4/-1;
        }
        
        ${TweetImage}:nth-of-type(3){
            grid-row: 2;
            grid-column: 1/span 2;
        }
        
        ${TweetImage}:nth-of-type(4){
            grid-row: 2;
            grid-column: 3/span 2;
        }
        
        ${TweetImage}:nth-of-type(5),
        ${ImageLeftPlaceHolder}{
            grid-row: 2;
            grid-column: 5/-1;
            position: relative;
        }
    `}
`;

export const DeleteImagesButton = styled.button`
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

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FileLabel = styled.label`
  svg {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
    fill: var(--blue-1);
    cursor: pointer;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const TweetSubmitButton = styled.button`
  padding: 0.8rem 2.4rem;
  background: var(--blue-1);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background: var(--gray-1);
  }
`;
