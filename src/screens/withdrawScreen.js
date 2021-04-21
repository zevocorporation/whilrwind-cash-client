import React, { useState } from "react";

//IMPORTING STYLESHEET

import "../styles/screens/withdraw.scss";

//IMPORTING PATTERNS

import { Footer, Wallet, Work } from "../patterns";
import { Button } from "../components";

//IMPORTING MEDIA ASSETS

import info from "../assets/icons/info.svg";
import hint from "../assets/icons/hint.svg";
import uparrow from "../assets/icons/uparrow.svg";

import { getWithdrawInfo, withdraw } from "../utils/whirlwind";

const WithdrawScreen = () => {
  //INITILIZING HOOKS

  const [state, setState] = useState(false);
  const [notes, setNotes] = useState();

  //HANDLING METHODS

  const handleWithdraw = async () => {
    let result = getWithdrawInfo(notes);
    console.log(result);
  };

  const finishWithdraw = async () => {
    let withdrawal = await withdraw();
    // .catch(function (result) {
    //   alert(result);
    // });
  };

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

  const renderDetailsCard = (
    <div className="block-right">
      <div style={inlineStyle.flex}>
        <p className="title-b-24-txt-pri">Latest deposits</p>
        <p className="txt-reg-14-txt-grad">see more</p>
      </div>
      <div className="transaction-card">
        <div className="history">
          <img src={uparrow} alt="uparrow" />
          <span>0 ETH</span>
          <span>address</span>
          <span>2 mins</span>
        </div>
      </div>
    </div>
  );

  const renderDetails = (
    <div className="details-block">
      <div className="block-left">
        <p style={inlineStyle.flexGap}>
          <span className="txt-reg-16-txt-pri">Note</span>
          <img src={info} alt="info" />
        </p>
        <div className="txt-reg-14-txt-pri note">
          <input type="text" onChange={(e) => setNotes(e.target.value)} />
        </div>
        <p style={inlineStyle.flexGap}>
          <span className="txt-reg-16-txt-pri">Recipient</span>
          <img src={info} alt="info" />
        </p>
        <div className="input-radio">
          <input type="radio" onChange={() => setState(false)} name="type" />
          <span>Me</span>
          <input type="radio" onChange={() => setState(true)} name="type" />
          <span>Someone else</span>
        </div>
        {state ? (
          <>
            <p className="txt-reg-16-txt-pri">Recipient address</p>
            <div className="note txt-reg-14-txt-sec">
              0xDD4c48C0B24039969fC16D1cdF626eaB821d3384
            </div>
          </>
        ) : null}
        <div style={inlineStyle.flexGap}>
          <img src={hint} alt="hint" />
          <p style={{ width: "90%" }} className="txt-reg-14-txt-sec">
            <span style={{ color: "#4FACFE", fontSize: 16 }}>Hint:</span>
            It is recommended you wait a little between deposit and withdrawal.
            Give your deposit some time to mix with deposits from other users,
            so that it won’t be possible to trace your transaction back to you.
          </p>
        </div>
        <Button className="btn-primary" onClick={() => handleWithdraw()}>
          Withdrawal info
        </Button>
        <Button className="btn-primary" onClick={() => finishWithdraw()}>
          Withdraw funds
        </Button>
      </div>
      {renderDetailsCard}
    </div>
  );

  const renderScreen = (
    <div className="withdraw-screen">
      {renderInfo}
      <Wallet
        title="Withdraw"
        details="Withdrawing takes tokens from your 
                privacy pool and enters them into the 
                metamask wallet. Once there, they can be 
                redeemed by you to deposit funds into 
                your privacy pool."
      />
      {renderDetails}
    </div>
  );

  return (
    <>
      {renderScreen}
      <Work />
      <Footer />
    </>
  );
};

export default WithdrawScreen;
