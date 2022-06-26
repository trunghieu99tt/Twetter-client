import styled from "styled-components";

export const Wrapper = styled.div`
  background: #ffffff;
  box-shadow: var(--box-shadow-1);
  border-radius: 8px;
  padding: 2rem;
  padding-left: 0;
  width: 30rem;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
  }
`;

export const List = styled.ul`
  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;

export const ListItem = styled("li")<{ active: boolean }>`
  margin-bottom: 1.8rem;
  padding: 0.5rem 2rem;
  position: relative;

  ${(props) =>
    props.active &&
    `
        &::before{
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            width: 3px;
            background: var(--blue-1);
            height: 100%;
            border-radius: 0px 8px 8px 0px;
        }
        
        @media (max-width: 1024px) {
          background: var(--blue-1);
        }
        
        a {
          @media (max-width: 1024px) {
            color: #fff !important;
          }
        }
    `}

  @media (max-width: 1024px) {
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }

  a {
    font-weight: 600;
    font-size: 1.4rem;
    color: ${(props) => (props.active ? "var(--blue-1)" : "var(--gray-1)")};
  }
`;
