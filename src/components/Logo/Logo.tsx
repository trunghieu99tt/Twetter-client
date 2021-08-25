import { Link } from "react-router-dom";

// context
import { useAppContext } from "../../context/app.context";

// images
import TweeterLight from "@images/tweeter-light.svg";
import Tweeter from "@images/tweeter.svg";

// styles
import { LogoWrapper, LogoImg } from "./LogoStyle";

const Logo = () => {
    const {
        state: { theme },
    } = useAppContext();
    const imageSrc = theme !== "LIGHT" ? TweeterLight : Tweeter;

    return (
        <LogoWrapper>
            <Link to="/">
                <LogoImg src={imageSrc} alt="Logo"></LogoImg>
            </Link>
        </LogoWrapper>
    );
};

export default Logo;
