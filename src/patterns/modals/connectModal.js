import React from "react";

//IMPORTING STYLESHEETS

import "../../styles/patterns/modal.scss";

//IMPORTING COMPONENTS

import { Button } from "../../components";

//IMPORTING MEDIA ASSETS

import metamask from "../../assets/images/metamask.png";

const ConnectModal = ({ setIsConnectPopup }) => {
  //HANDLING BINANCE WALLET

  const handleBinance = () => {};

  //HANDLING METAMASK WALLET

  const handleMetamask = () => {};

  return (
    <div className="connect-modal">
      <Button onClick={() => handleBinance()}>Binance</Button>
      <Button onClick={() => handleMetamask()}>Metamask</Button>
      <span onClick={() => setIsConnectPopup(false)}>Close</span>
    </div>
  );
};

export default ConnectModal;

export const ConnectWalletWarningModal = () => {
  return (
    <div className="warning-modal">
      <img src={metamask} ait="metamask-logo" />
      <p>Connect Wallet</p>
      <p>
        Connect your Metamask account to Whirlwind.Cash for continuing
        transactions.
      </p>
      <Button className="btn-primary">Connect</Button>
    </div>
  );
};
