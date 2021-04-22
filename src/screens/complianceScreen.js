import React, { useState } from "react";

//IMPORTING STYLESHEET

import "../styles/screens/withdraw.scss";

//IMPORTING PATTERNS

import { Footer, Wallet, Work } from "../patterns";
import { Button } from "../components";
import { getFullInfo } from "../utils/whirlwind";
import { ProcessModal } from "../patterns/modals/modal";
import ConnectModal from "../patterns/modals/connectModal";

//IMPORTING MEDIA ASSETS

import info from "../assets/icons/info.svg";
import hint from "../assets/icons/hint.svg";
import uparrow from "../assets/icons/uparrow.svg";

const ComplianceScreen = () => {
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectPopup, setIsConnectPopup] = useState(false);

  //HANDLING METHODS

  const handleCompliance = async () => {
    setIsLoading(true);
    await getFullInfo().catch((res) => {
      alert(res);
      setIsLoading(false);
    });
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
        <div style={inlineStyle.flexGap}>
          <img src={hint} alt="hint" />
          <p style={{ width: "90%" }} className="txt-reg-14-txt-sec">
            <span style={{ color: "#4FACFE", fontSize: 16 }}>Hint:</span>
            It is recommended you wait a little between deposit and withdrawal.
            Give your deposit some time to mix with deposits from other users,
            so that it won’t be possible to trace your transaction back to you.
          </p>
        </div>
        {window.from ? (
          <Button className="btn-primary" onClick={() => handleCompliance()}>
            Get compliance info
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

  const renderScreen = (
    <div className="compliance-screen">
      {renderInfo}
      <Wallet
        title="compliance"
        details="Compliance is used to get info about a note, 
                such as its deposit as well as any matching withdrawal."
      />
      {renderDetails}
    </div>
  );

  return (
    <>
      {renderScreen}
      {isLoading ? <ProcessModal variant="compliance" /> : null}
      {isLoading || isConnectPopup ? (
        <div
          className="backdrop"
          onClick={() => setIsConnectPopup(false)}
        ></div>
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

export default ComplianceScreen;
