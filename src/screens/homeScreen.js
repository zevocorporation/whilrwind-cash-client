import React from "react";

//IMPORTING STYLESHEET

import "../styles/screens/home.scss";

//IMPORTING PATTERNS

import { Footer, Wallet, Work } from "../patterns/";
import { Button } from "../components";
//IMPORTING MEDIA ASSETS

import info from "../assets/icons/info.svg";
import hint from "../assets/icons/hint.svg";
import downarrow from "../assets/icons/downarrow.svg";

import ConnectWallet, { checkNetwork } from "../patterns/modals/connectWallet";

const HomeScreen = () => {
  // INITIALIZING HOOKS
  const [coin, setCoin] = React.useState();
  const [amount, setAmount] = React.useState();
  const [notes, setNotes] = React.useState();

  //HANDLING METHODS

  const handleDeposit = () => {
    console.warn("coin", coin);
    console.warn("amount", amount);
    let notes = "Initial dummy note";
    // web3 generating notes

    setNotes(notes);
  };

  async function setData(choice) {
    let selectedCoin;
    let selectedAmount;
    if (coin === "BNB") {
      selectedCoin = 0;
      if (choice === "0.1") {
        selectedAmount = 0;
      }
      if (choice === "1") {
        selectedAmount = 1;
      }
      if (choice === "10") {
        selectedAmount = 2;
      }
      if (choice === "100") {
        selectedAmount = 3;
      }
    }
    if (coin === "WIND") {
      selectedCoin = 1;
      if (choice === "1") {
        selectedAmount = 0;
      }
      if (choice === "10") {
        selectedAmount = 1;
      }
      if (choice === "100") {
        selectedAmount = 2;
      }
      if (choice === "1000") {
        selectedAmount = 3;
      }
    }
    console.log(selectedCoin, selectedAmount, choice);
    let note = window.getNote(selectedCoin, selectedAmount);
    setNotes(note);
  }

  //INLINE STYLES

  const inlineStyle = {
    flex: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    flexGap: {
      display: "flex",
      alignItems: "center",
      gridGap: 10,
    },
  };

  //RENDER INFO

  const renderInfo = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gridGap: 16,
        marginBottom: "2em",
      }}
    >
      <img src={info} alt="info" />
      <p className="txt-reg-14-txt-grad">
        This is an experimental software. Use it at your own risk.
      </p>
    </div>
  );

  //RENDER DETAILS CARD

  const renderDetailsCard = (
    <div className="block-right">
      <div className="block-header">
        <p className="title-b-24-txt-pri">Latest deposits</p>
        <p className="txt-reg-14-txt-grad">see more</p>
      </div>
      <div className="transaction-card">
        <div className="history">
          <img src={downarrow} alt="downarrow" />
          <span>0 ETH</span>
          <span>address</span>
          <span>2 mins ago</span>
        </div>
        <div className="history">
          <img src={downarrow} alt="downarrow" />
          <span>0 ETH</span>
          <span>address</span>
          <span>2 mins ago</span>
        </div>
      </div>
    </div>
  );

  //RENDER WIND AMOUNTS

  const renderWINDAmounts = (
    <select onChange={(e) => setData(e.target.value)}>
      <option>1</option>
      <option>10</option>
      <option>100</option>
      <option>1000</option>
    </select>
  );

  //RENDER BNB AMOUNT

  const renderBNBAmounts = (
    <select onChange={(e) => setData(e.target.value)}>
      <option>0.1</option>
      <option>1</option>
      <option>10</option>
      <option>100</option>
      <option>1000</option>
    </select>
  );

  //RENDER NOTES

  const renderNotes = <p>{notes}</p>;

  //RENDER DETAILS

  const renderDetails = (
    <div className="details">
      <div className="block-left">
        <p className="txt-reg-16-txt-pri">Token </p>
        <div style={inlineStyle.flex} className="select-input">
          <select onChange={(e) => setCoin(e.target.value)}>
            <option>BNB</option>
            <option>WIND</option>
          </select>
          <div style={inlineStyle.flexGap}>
            <img src={info} alt="info" />
            <span
              className="txt-reg-14-txt-pri"
              style={{ whiteSpace: "nowrap" }}
            >
              1 ETH = $663.37
            </span>
          </div>
        </div>
        <p style={inlineStyle.flexGap}>
          <span className="txt-reg-16-txt-pri">Amount</span>
          <img src={info} alt="info" width={18} />
        </p>
        <div className="amount-block">
          {coin === "BNB" && renderBNBAmounts}
          {coin === "WIND" && renderWINDAmounts}
        </div>
        {renderNotes}
        <div style={inlineStyle.flexGap}>
          <img src={hint} alt="hint" />
          <p style={{ width: "90%" }} className="txt-reg-14-txt-sec">
            <span style={{ color: "#4FACFE", fontSize: 16 }}>Hint:</span>
            It is recommended you wait a little between deposit and withdrawal.
            Give your deposit some time to mix with deposits from other users,
            so that it won’t be possible to trace your transaction back to you.
          </p>
        </div>
        <Button className="btn-primary" onClick={() => window.deposit()}>
          Connect wallet to deposit
        </Button>
      </div>
      {renderDetailsCard}
    </div>
  );

  //RENDER SCREEN

  const renderHomeScreen = (
    <div className="home">
      {renderInfo}
      <Wallet
        title="deposit"
        details="Depositing takes funds from your 
                    wallet and enters them into the privacy 
                    pool. Once there, they can be redeemed 
                    by anyone with the note; a secret that 
                    cannot be linked to the original deposit."
      />
      {renderDetails}
    </div>
  );

  return (
    <>
      {renderHomeScreen}
      <Work />
      <ConnectWallet />
      <Footer />
    </>
  );
};

export default HomeScreen;
