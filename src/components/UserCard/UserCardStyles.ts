import styled from "styled-components";

export const Wrapper = styled.article`
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-bottom: 1px solid var(--gray-5);
  padding: 2rem;
  box-shadow: var(--box-shadow-1);
  margin-bottom: 1rem;
  border-radius: 0.8rem;
  min-width: 50rem;
  max-width: 100%;
`;

export const UserName = styled.p`
  font-size: 1.6rem;
`;

export const UserFollowers = styled.p`
  font-size: 12px;
  color: var(--gray-1);
`;

export const UserBio = styled.p`
  font-size: 14px;
  color: var(--gray-1);
`;
