import styled from "styled-components";

export const Wrapper = styled("div")<{
  isOpen: boolean;
}>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Main = styled.div`
  max-width: 70%;
  background: #fff;
  z-index: 1;
  border-radius: 8px;
  padding: 2rem;
`;

export const Header = styled("div")<{
  customHeaderStyles?: string;
}>`
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  font-weight: 600;
  font-size: 12px;
  border-bottom: var(--border-1) ${(props) => props.customHeaderStyles};
`;

export const Body = styled.div`
  max-height: 50rem;
  overflow: auto;
`;

export const Footer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: end;
  border-top: 1px solid var(--gray-4);
  margin-top: 2rem;
  gap: 1rem;
`;

export const OkButton = styled.button`
  background: var(--blue-2);
  padding: 0.5rem 3rem;
  border-radius: 5px;
  color: #fff;
  font-weight: 500;
`;

export const CancelButton = styled.button`
  background: var(--red);
  color: #fff;
  font-weight: 500;
  border-radius: 5px;
  padding: 0.5rem 2rem;
`;
