import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div``;

export const TagWrapper = styled(Link)`
  margin-bottom: 2.5rem;
  display: block;
  color: var(--blue-1);
`;

export const TagName = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const TagCounter = styled.span`
  color: var(--gray-1);
  font-size: 1.2rem;
  font-weight: 500;
`;
