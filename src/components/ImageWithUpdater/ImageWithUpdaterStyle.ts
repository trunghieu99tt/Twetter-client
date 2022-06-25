import styled from "styled-components";

export const MainImage = styled("img")<{
  customStyles?: string;
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const UpdateWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: none;
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    cursor: pointer;

    svg {
      --size: 1.5rem;
      width: var(--size);
      height: var(--size);
    }
  }

  input {
    display: none;
  }
`;

export const Wrapper = styled("div")<{
  customStyles?: string;
}>`
  --size: 15rem;
  width: var(--size);
  height: var(--size);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
  position: relative;

  ${({ customStyles }) => customStyles}

  &:hover ${UpdateWrapper} {
    display: block;
  }
`;

export const ActionButtons = styled.div`
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  button:disabled {
    cursor: initial;
  }
`;

export const CancelButton = styled.button`
  border-radius: 5px;
  color: #fff;
`;

export const LoadingStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
