import React, { useState, useContext } from "react";

//IMPORTING STYLESHEET

import "../styles/screens/home.scss";

//IMPORTING PATTERNS

import { NoteModal, SuccessModal } from "../patterns/modals/modal";
import { Footer, Wallet, Work } from "../patterns/";
import { Button } from "../components";
import { deposit, getNote } from "../utils/whirlwind";
import ConnectModal from "../patterns/modals/connectModal";

//IMPORTING MEDIA ASSETS

import info from "../assets/icons/info.svg";
import hint from "../assets/icons/hint.svg";

//IMPORTING STORE COMPONENTS

import { UserContext } from "../store/contexts";

const HomeScreen = () => {
  // INITIALIZING HOOKS

  const [notes, setNotes] = useState();
  const [isSelectedBnb, setIsSelectedBnb] = useState(false);
  const [isSelectedWind, setIsSelectedWind] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState();
  const [isSelectedAmt, setIsSelectedAmt] = useState();
  const [isNoteModal, setIsNoteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIssuccess] = useState(false);
  const [tab1, setTab1] = useState();
  const [tab2, setTab2] = useState();
  const [isConnectPopup, setIsConnectPopup] = useState(false);
  const { userState } = useContext(UserContext);

  //HANDLING DEPOSIT METHODS

  async function proceedDeposit() {
    if (notes !== undefined) {
      setIsLoading(true);
      try {
        await deposit()
          .then((res) => {
            console.log(res);
            setIsLoading(false);
            setIsNoteModal(false);
            setIssuccess(true);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            setIsError(true);
            setTimeout(() => {
              setIsError(false);
              setIsNoteModal(false);
            }, 3000);
          });
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
    setTab1();
  };

  const handleWind = () => {
    setIsSelectedWind(true);
    setIsSelectedBnb(false);
    setSelectedCoin(1);
    setIsSelectedAmt();
    setTab2();
  };

  console.log(selectedCoin, "1");
  console.log(isSelectedAmt);

  const handleBnbAmt = (amt) => {
    setIsSelectedAmt(amt);
    setTab1(amt);
  };

  const handleWindAmt = (amt) => {
    setIsSelectedAmt(amt);
    setTab2(amt);
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

  //RENDER WIND AMOUNTS

  const renderWINDAmounts = (
    <>
      <span
        onClick={() => handleWindAmt(0)}
        style={{
          background: tab2 === 0 ? "#fff" : "",
          color: tab2 === 0 ? "rgb(79, 172, 254)" : "",
        }}
      >
        1
      </span>
      <span
        onClick={() => handleWindAmt(1)}
        style={{
          background: tab2 === 1 ? "#fff" : "",
          color: tab2 === 1 ? "rgb(79, 172, 254)" : "",
        }}
      >
        10
      </span>
      <span
        onClick={() => handleWindAmt(2)}
        style={{
          background: tab2 === 2 ? "#fff" : "",
          color: tab2 === 2 ? "rgb(79, 172, 254)" : "",
        }}
      >
        100
      </span>
      <span
        onClick={() => handleWindAmt(3)}
        style={{
          background: tab2 === 3 ? "#fff" : "",
          color: tab2 === 3 ? "rgb(79, 172, 254)" : "",
        }}
      >
        1000
      </span>
    </>
  );

  //RENDER BNB AMOUNT

  const renderBNBAmounts = (
    <>
      <span
        onClick={() => handleBnbAmt(0)}
        style={{
          background: tab1 === 0 ? "#fff" : "",
          color: tab1 === 0 ? "rgb(79, 172, 254)" : "",
        }}
      >
        0.1
      </span>
      <span
        onClick={() => handleBnbAmt(1)}
        style={{
          background: tab1 === 1 ? "#fff" : "",
          color: tab1 === 1 ? "rgb(79, 172, 254)" : "",
        }}
      >
        1
      </span>
      <span
        onClick={() => handleBnbAmt(2)}
        style={{
          background: tab1 === 2 ? "#fff" : "",
          color: tab1 === 2 ? "rgb(79, 172, 254)" : "",
        }}
      >
        10
      </span>
      <span
        onClick={() => handleBnbAmt(3)}
        style={{
          background: tab1 === 3 ? "#fff" : "",
          color: tab1 === 3 ? "rgb(79, 172, 254)" : "",
        }}
      >
        100
      </span>
    </>
  );

  //RENDER DETAILS

  const renderDetails = (
    <div className="details">
      <div className="block-left">
        <p className="txt-reg-16-txt-pri">Token </p>
        <div style={inlineStyle.flex} className="select-input">
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
        {isSelectedAmt !== undefined ? (
          userState?.address ? (
            <Button className="btn-primary" onClick={() => setData()}>
              Generate note
            </Button>
          ) : (
            <Button
              className="btn-primary"
              onClick={() => setIsConnectPopup(true)}
            >
              Connect wallet
            </Button>
          )
        ) : null}
      </div>
      {/* {renderDetailsCard} */}
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
          isLoading={isLoading}
          isError={isError}
        />
      ) : null}
      {isNoteModal || isSuccess || isConnectPopup ? (
        <div
          className="backdrop"
          onClick={() => setIsConnectPopup(false)}
        ></div>
      ) : null}
      <SuccessModal setIssuccess={setIssuccess} isSuccess={isSuccess} />
      {isConnectPopup ? (
        <ConnectModal setIsConnectPopup={setIsConnectPopup} />
      ) : null}
      <Work />

      <Footer />
    </>
  );
};

//EXPORTING SCREENS

export default HomeScreen;
