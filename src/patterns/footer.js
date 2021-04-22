import React from "react";

//IMPORTING STYLESHEET

import "../styles/patterns/footer.scss";

//IMPORTING COMPONENTS

import { Link } from "../components/";

//IMPORTING MEDIA ASSETS

import facebook from "../assets/icons/social icons/facebook.svg";
import instagram from "../assets/icons/social icons/instagram.svg";
import linkedin from "../assets/icons/social icons/linkedin.svg";
import twitter from "../assets/icons/social icons/twitter.svg";
import twitch from "../assets/icons/social icons/twitch.svg";
import logotext from "../assets/logo/logotext.png";

const Footer = () => {
  //RENDERING ICONS

  const renderIcons = (
    <div className="icons">
      <Link to="/">
        <img src={facebook} alt="facebook" />
      </Link>
      <Link to="/">
        <img src={twitter} alt="twitter" />
      </Link>
      <Link to="/">
        <img src={twitch} alt="twitch" />
      </Link>
      <Link to="/">
        <img src={instagram} alt="instagram" />
      </Link>
      <Link to="/">
        <img src={linkedin} alt="linkedin" />
      </Link>
    </div>
  );

  //RENDERING LOGO

  const renderLogo = (
    <div className="footer-logo">
      <img src={logotext} alt="logo" />
      <div>
        <p>Copyright © 2010-2021 Whirlwind.Cash. All rights reserved.</p>
        <p>Built & Managed by ZEVO Corporation</p>
      </div>
    </div>
  );

  //RENDERING COPYRIGHTS

  const renderCopyrights = (
    <div className="copyright">
      <p>Copyright © 2010-2021 Whirlwind.Cash. All rights reserved.</p>
      <p>Built & Managed by ZEVO Corporation</p>
    </div>
  );

  return (
    <div className="footer">
      {renderLogo}
      {renderIcons}
      {renderCopyrights}
    </div>
  );
};

export default Footer;
