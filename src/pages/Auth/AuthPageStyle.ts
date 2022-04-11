import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  background: #fff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.div`
  display: flex;
  max-width: 70%;
  border-radius: 0.8rem;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
`;

export const AuthCoverPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Right = styled.div`
  background: #fff;
  flex: 1;
  padding: 10rem;
  max-height: 90vh;
  overflow: auto;
`;

export const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
`;

export const HeadToAdminAuth = styled(Link)`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
`;
