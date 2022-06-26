import styled from "styled-components";

export const Wrapper = styled.div``;

export const Content = styled.div`
  display: flex;
  gap: 2.5rem;
  margin: 2.5rem auto;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const Sidebar = styled.aside`
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const Main = styled.div`
  flex: 1;
`;
