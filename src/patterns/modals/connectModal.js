import React from "react";

//IMPORTING STYLESHEETS

import "../../styles/patterns/modal.scss";

//IMPORTING COMPONENTS

import { Button } from "../../components";

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
