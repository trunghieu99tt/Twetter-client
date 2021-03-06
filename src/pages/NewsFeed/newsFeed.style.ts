import styled from "styled-components";

export const Container = styled.div`
  max-width: 75%;
  margin: 0 auto;
`;

export const Wrapper = styled.section`
  margin-top: 2.5rem;
`;

export const Inner = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
`;

export const Main = styled.section`
  width: 50%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const Sidebar = styled.aside`
  flex: 1;
  max-width: 30rem;
  max-height: 100vh;
  top: 7rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const RightSidebar = styled.aside`
  max-height: 100vh;
  position: sticky;
  top: 7rem;
  background: #ffffff;
  box-shadow: var(--box-shadow-1);
  border-radius: 1.2rem;
  max-height: 50rem;
  overflow: auto;
  padding: 2rem;
  width: 30rem;
`;
