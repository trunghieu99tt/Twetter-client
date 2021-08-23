import React from "react";

// context
import { useAppContext } from "../../context/app.context";

// images
import TweeterLight from "@images/tweeter-light.svg";
import Tweeter from "@images/tweeter.svg";
// styles
import { LogoWrapper, LogoImg } from "./LogoStyle";

interface Props {}

const Logo = (props: Props) => {
    // const imageSrc = theme === "LIGHT" ? TweeterLight : Tweeter;

    const imageSrc = Tweeter;

    return (
        <LogoWrapper>
            <LogoImg src={imageSrc} alt="Logo"></LogoImg>
        </LogoWrapper>
    );
};

export default Logo;
