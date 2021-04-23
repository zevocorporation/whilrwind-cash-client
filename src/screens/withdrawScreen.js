import React, { useState, useContext } from "react";

//IMPORTING STYLESHEET

import "../styles/screens/withdraw.scss";

//IMPORTING PATTERNS

import { ProcessModal } from "../patterns/modals/modal";
import { Footer, Wallet, Work } from "../patterns";
import { Button } from "../components";
import ConnectModal from "../patterns/modals/connectModal";

//IMPORTING MEDIA ASSETS

import info from "../assets/icons/info.svg";
import hint from "../assets/icons/hint.svg";
import cross from "../assets/icons/cross.svg";

//IMPORTING STORE COMPONENTS

import { UserContext } from "../store/contexts";

//IMPORTING UTILITY PACKAGES

import { getWithdrawInfo, withdraw } from "../utils/whirlwind";

const WithdrawScreen = () => {
  //INITILIZING HOOKS

  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMsg, setIsMsg] = useState(false);
  const [response, setResponse] = useState("");
  const [isConnectPopup, setIsConnectPopup] = useState(false);
  const { userState } = useContext(UserContext);

  //HANDLING METHODS

  const handleWithdraw = async () => {
    console.log(notes);
    if (notes !== undefined) {
      getWithdrawInfo(notes);
      setIsLoading(true);
      await withdraw()
        .then((res) => {
          console.log(res);
          setResponse(res);
          setIsLoading(false);
          setIsMsg(true);
          setTimeout(() => {
            setIsMsg(false);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setResponse({ err: error });
          setIsError(true);
        });
    }
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

  //RENDERING INFO

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

  //RENDERING DETAILS

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
        <div style={inlineStyle.flexGap}>
          <img src={hint} alt="hint" />
          <p style={{ width: "90%" }} className="txt-reg-14-txt-sec">
            <span style={{ color: "#4FACFE", fontSize: 16 }}>Hint:</span>
            It is recommended you wait a little between deposit and withdrawal.
            Give your deposit some time to mix with deposits from other users,
            so that it won’t be possible to trace your transaction back to you.
          </p>
        </div>
        {userState?.address ? (
          <Button className="btn-primary" onClick={() => handleWithdraw()}>
            Withdrawal info
          </Button>
        ) : (
          <Button
            className="btn-primary"
            onClick={() => setIsConnectPopup(true)}
          >
            Connect wallet
          </Button>
        )}
      </div>
      {/* {renderDetailsCard} */}
    </div>
  );

  //RENDERING SCREEN

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
      {isLoading ? <ProcessModal /> : null}
      {isLoading || isMsg || isConnectPopup ? (
        <div
          className="backdrop"
          onClick={() => setIsConnectPopup(false)}
        ></div>
      ) : null}
      {isError ? (
        <div className="error-popup">
          <img src={cross} alt="cross" />
          <p>{response.err}</p>
        </div>
      ) : null}
      {isMsg ? (
        <div className="error-popup">
          <p>{response}</p>
        </div>
      ) : null}
      {isConnectPopup ? (
        <ConnectModal setIsConnectPopup={setIsConnectPopup} />
      ) : null}
      <Work />
      <Footer />
    </>
  );
};

//EXPORTING SCREENS

export default WithdrawScreen;
