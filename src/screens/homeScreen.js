import React, { useState } from "react";

//IMPORTING STYLESHEET

import "../styles/screens/home.scss";

//IMPORTING PATTERNS

import { NoteModal } from "../patterns/modals/modal";
import { Footer, Wallet, Work } from "../patterns/";
import { Button } from "../components";
import { deposit, getNote } from "../utils/whirlwind";

//IMPORTING MEDIA ASSETS

import info from "../assets/icons/info.svg";
import hint from "../assets/icons/hint.svg";
import downarrow from "../assets/icons/downarrow.svg";

const HomeScreen = () => {
  // INITIALIZING HOOKS
  const [coin, setCoin] = useState();
  const [amount, setAmount] = useState();
  const [notes, setNotes] = useState();
  const [isSelectedBnb, setIsSelectedBnb] = useState(false);
  const [isSelectedWind, setIsSelectedWind] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState();
  const [isSelectedAmt, setIsSelectedAmt] = useState();
  const [isNoteModal, setIsNoteModal] = useState(false);

  //HANDLING METHODS

  const handleDeposit = () => {
    console.warn("coin", coin);
    console.warn("amount", amount);
    let notes = "Initial dummy note";
    // web3 generating notes

    setNotes(notes);
  };

  async function proceedDeposit() {
    if (notes !== undefined) {
      try {
        let result = await deposit();
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Generate Notes before deposit");
    }
  }

  async function setData() {
    if (selectedCoin !== undefined || isSelectedAmt !== undefined) {
      let note = getNote(selectedCoin, isSelectedAmt);
      setNotes(note);
      setIsNoteModal(true);
    } else {
      alert("Choose a coin and a amount for further proceeding");
    }
  }

  const handleBnb = () => {
    setIsSelectedWind(false);
    setIsSelectedBnb(true);
    setSelectedCoin(0);
    setIsSelectedAmt();
  };

  const handleWind = () => {
    setIsSelectedWind(true);
    setIsSelectedBnb(false);
    setSelectedCoin(1);
    setIsSelectedAmt();
  };

  console.log(selectedCoin, "1");
  console.log(isSelectedAmt);

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
    <>
      <span onClick={() => setIsSelectedAmt(0)}>1</span>
      <span onClick={() => setIsSelectedAmt(1)}>10</span>
      <span onClick={() => setIsSelectedAmt(2)}>100</span>
      <span onClick={() => setIsSelectedAmt(3)}>1000</span>
    </>
  );

  //RENDER BNB AMOUNT

  const renderBNBAmounts = (
    <>
      <span onClick={() => setIsSelectedAmt(0)}>0.1</span>
      <span onClick={() => setIsSelectedAmt(1)}>1</span>
      <span onClick={() => setIsSelectedAmt(2)}>10</span>
      <span onClick={() => setIsSelectedAmt(3)}>100</span>
    </>
  );

  //RENDER NOTES

  const renderNotes = <p>{notes}</p>;

  //RENDER DETAILS

  const renderDetails = (
    <div className="details">
      <div className="block-left">
        <p className="txt-reg-16-txt-pri">Token </p>
        <div style={inlineStyle.flex} className="select-input">
          {/* <select onChange={(e) => setCoin(e.target.value)}>
            <option>BNB</option>
            <option>WIND</option>
          </select> */}
          <div className="coin">
            <p
              className="title-b-16-txt-pri"
              style={{
                background: isSelectedBnb
                  ? `linear-gradient(
                  180deg
                  , #00f2fe -24136%, #4facfe 48696%)`
                  : null,
              }}
              onClick={() => handleBnb()}
            >
              Bnb
            </p>
            <p
              className="title-b-16-txt-pri"
              style={{
                background: isSelectedWind
                  ? `linear-gradient(
                  180deg
                  , #00f2fe -24136%, #4facfe 48696%)`
                  : null,
              }}
              onClick={() => handleWind()}
            >
              Wind
            </p>
          </div>
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
        <p
          style={{
            display: selectedCoin === undefined ? "none" : "flex",
            gridGap: 10,
            alignItems: "center",
            opacity: selectedCoin === undefined ? "0" : "1",
          }}
        >
          <span className="txt-reg-16-txt-pri">Amount</span>
          <img src={info} alt="info" width={18} />
        </p>
        <div
          className="amount-block"
          style={{
            display: selectedCoin === undefined ? "none" : "grid",
            opacity: selectedCoin === undefined ? "0" : "1",
          }}
        >
          {selectedCoin === 0 && renderBNBAmounts}
          {selectedCoin === 1 && renderWINDAmounts}
        </div>
        <div style={inlineStyle.flexGap}>
          <img src={hint} alt="hint" />
          <p style={{ width: "90%" }} className="txt-reg-14-txt-sec">
            <span style={{ color: "#4FACFE", fontSize: 16 }}>Hint:</span>
            It is recommended you wait a little between deposit and withdrawal.
            Give your deposit some time to mix with deposits from other users,
            so that it won’t be possible to trace your transaction back to you.
          </p>
        </div>
        <Button className="btn-primary" onClick={() => setData()}>
          Generate note
        </Button>
        {/* <Button className="btn-primary" onClick={() => proceedDeposit()}>
          Deposit
        </Button> */}
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
      {isNoteModal ? (
        <NoteModal
          note={notes}
          setIsNoteModal={setIsNoteModal}
          deposit={proceedDeposit}
        />
      ) : null}
      {isNoteModal ? <div className="backdrop"></div> : null}
      <Work />

      <Footer />
    </>
  );
};

export default HomeScreen;
