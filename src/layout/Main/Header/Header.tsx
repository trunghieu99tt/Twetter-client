// components
import Logo from "@components/Logo";
import TopMenu from "@components/TopMenu";
import { lazy, Suspense } from "react";

const MyAccountMenu = lazy(() => import("@components/MyAccountMenu"));

// styles
import { Wrapper } from "./HeaderStyle";

const Header = () => {
  return (
    <Wrapper>
      <Logo />
      <TopMenu />
      <Suspense
        fallback={
          <div>
            <p>Loading...</p>
          </div>
        }
      >
        <MyAccountMenu />
      </Suspense>
    </Wrapper>
  );
};

export default Header;
