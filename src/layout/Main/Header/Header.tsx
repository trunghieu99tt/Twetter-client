// components
import Logo from "@components/Logo";
import TopMenu from "@components/TopMenu";
import MyAccountMenu from "@components/MyAccountMenu";

// styles
import { Wrapper } from "./HeaderStyle";

const Header = () => {
    return (
        <Wrapper>
            <Logo />
            <TopMenu />
            <MyAccountMenu />
        </Wrapper>
    );
};

export default Header;
