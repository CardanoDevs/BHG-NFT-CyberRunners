import { NotificationManager } from "react-notifications";
import { Link } from "react-scroll";

import "./TopMenu.scss";
import logo from "../../assets/img/icons/logo.svg";
import topIcon1 from "../../assets/img/icons/topIcon1.svg";
import topIcon2 from "../../assets/img/icons/topIcon2.svg";
import topIcon3 from "../../assets/img/icons/topIcon3.svg";

import menuIcon from "../../assets/img/icons/menu.svg";

import {calculatePreTimeLeft} from "../../helpers/timer";
import logoText from "../../assets/img/font_svg/cyberunners-text-logo.svg";
import { useLocation, useHistory } from "react-router-dom";

const menu = ["about", "rarity", "roadmap", "team"];

const TopLogo = () => {
  return (
    <div className="topMenu__logo">
      <img src={logo} className="topMenu__logo__img" alt="logo" />
      <img src={logoText} className="topMenu__logo__text" alt="logotext" />
    </div>
  );
};

const TopButtons = ({ walletAddress }) => {
  const history = useHistory();
  const connectWallet = () => {
    if (!! walletAddress) {
    let timeLeft = calculatePreTimeLeft();
    if (Object.keys(timeLeft).length === 0) {
      history.push("/mint");
    } else
      NotificationManager.info(
        "Presale is not Open! Please retry on launch date."
      );
    } else {

      NotificationManager.info(
        "🦊 You must install Metamask in your browser or mobile !"
      );
    }
  };

  return (
    <div className="topMenu__menu">
      <button className="topMenu__menu__walletBtn" onClick={connectWallet}>
        {walletAddress === "" ? "CONNECT WALLET" : walletAddress}
      </button>
      {/* <button className="topMenu__menu__walletBtn" onClick={ connectWallet } >CONNECT WALLET</button> */}
      <div className="topMenu__menu__icons">
        <a href="https://discord.gg/cyberunners">
          <img src={topIcon1} alt="logo" />
        </a>
        <a href="https://twitter.com/cyberunners">
          <img src={topIcon2} alt="logo" />
        </a>
        <a href="https://instagram.com/cyberunners">
          <img src={topIcon3} alt="logo" />
        </a>
      </div>

      <div className="topMenu__menu__dropDownMenu">
        <img
          src={menuIcon}
          className="topMenu__menu__dropDownMenu__icon"
          alt="menu"
        />
        <div className="topMenu__menu__dropDownMenu__content">
          {menu.map((item, index) => (
            <Link key={index} smooth={true} duration={500} spy={true} to={item}>
              {item.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TopMenu = ({ walletAddress }) => {
  return (
    <div className="topMenu container">
      <TopLogo />
      <TopButtons walletAddress={walletAddress} />
    </div>
  );
};

export default TopMenu;
