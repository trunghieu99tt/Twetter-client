import TweeterLight from "@images/tweeter-light.svg";
import SmallTweeter from "@images/tweeter-small.svg";
import Tweeter from "@images/tweeter.svg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/app.context";
import { LogoImg, LogoWrapper } from "./LogoStyle";

const Logo = (): JSX.Element => {
  const {
    state: { theme, screenSize },
    dispatch,
  } = useAppContext();

  let imageSrc = theme !== "LIGHT" ? TweeterLight : Tweeter;
  if (screenSize !== "DESKTOP") {
    imageSrc = SmallTweeter;
  }

  const showLeftSideBar = () => {
    dispatch({
      type: "SET_VISIBLE_LEFT_SIDEBAR",
      payload: true,
    });
  };

  return (
    <LogoWrapper>
      {(screenSize === "DESKTOP" && (
        <Link to="/">
          <LogoImg src={imageSrc} alt="Logo" />
        </Link>
      )) || (
        <button onClick={showLeftSideBar}>
          <LogoImg src={imageSrc} alt="Logo" />
        </button>
      )}
    </LogoWrapper>
  );
};

export default Logo;
