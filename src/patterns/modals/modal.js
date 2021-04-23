import React, { useState, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

//IMPORTING STYLESHEET

import "../../styles/patterns/modal.scss";

//IMPORTING COMPONENTS

import { Button } from "../../components";

//IMPORTING MEDIA ASSETS

import sucesss from "../../assets/images/depositsuccess.svg";
import close from "../../assets/icons/close.svg";
import copy from "../../assets/icons/copy.svg";
import cross from "../../assets/icons/cross.svg";
import tick from "../../assets/icons/tick.svg";
import loader from "../../assets/loader/loader.gif";

export const SuccessModal = ({ isSuccess, setIssuccess }) => {
  return (
    <div
      className="success-modal"
      style={{
        zIndex: isSuccess ? "1050" : "-1",
        opacity: isSuccess ? "1" : "0",
      }}
    >
      <img src={sucesss} alt="success-svg" />
      <p className="title-b-24-txt-pri">Congratulations</p>
      <p className="txt-reg-14-txt-sec">
        Your funds has been transfered into your privacy pool and the can be
        withdrawed with the personal note provided to you.
      </p>
      <Button className="btn-primary" onClick={() => setIssuccess(false)}>
        Done for now
      </Button>
    </div>
  );
};

export const NoteModal = ({
  note,
  setIsNoteModal,
  deposit,
  isLoading,
  isError,
}) => {
  //INITIALIZING HOOKS

  const [toast, setToast] = useState(false);
  const [check, setCheck] = useState(false);
  const [Copied, setCopied] = useState(false);

  //HANDLING METHODS
  console.log(check);

  const handleCopy = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1000);
  };

  //INLINE STYLES

  const inlineStyle = {
    flex: {
      display: "flex",
      alignItems: "center",
      gridGap: 16,
    },
  };

  //RENDERING MODAL

  const renderNoteModal = (
    <>
      <div>
        <p>Your note</p>
        <img
          src={close}
          alt="close"
          className="cursor"
          onClick={() => setIsNoteModal(false)}
        />
      </div>
      <p className="txt-reg-16-txt-sec">
        Make sure you save this someplace safe. If you do not, your funds will
        be lost forever.
      </p>
      <textarea
        className="txt-reg-14-txt-sec note"
        readOnly
        value={note}
        placeholder={note}
        onChange={({ target: { value } }) => setCopied(false)}
      />
      <div className="note-block">
        <p className="txt-reg-16-txt-grad">See note</p>
        <CopyToClipboard text={note} onCopy={() => setCopied(true)}>
          <p style={inlineStyle.flex} onClick={() => handleCopy()}>
            <img src={copy} alt="copy" />
            <span>Copy to clipboard</span>
          </p>
        </CopyToClipboard>
        {toast ? (
          <div className="toast">
            <img src={tick} alt="tick" />
            <p>Copied to clipboard</p>
          </div>
        ) : null}
      </div>
      <p style={inlineStyle.flex}>
        <input
          type="checkbox"
          style={{ cursor: "pointer" }}
          checked={check}
          onChange={() => setCheck(!check)}
        />
        <span>I have backed up my personal note</span>
      </p>
      <button
        className="btn-primary"
        disabled={!check}
        onClick={() => deposit()}
      >
        Deposit
      </button>
    </>
  );

  //RENDERING LOADER

  const renderLoader = (
    <div className="loader">
      <img src={loader} alt="loader" />
      <p className="txt-reg-16-txt-sec">Depositing your funds</p>
      <div>
        <p className="txt-reg-14-txt-sec">Don't refresh or close the tab </p>
        <p className="txt-reg-14-txt-sec">
          until the transaction has been finished
        </p>
      </div>
    </div>
  );

  //REDNERING ERROR

  const renderError = (
    <div className="error">
      <img src={cross} alt="cross" width={"25%"} />
      <p className="txt-reg-16-txt-sec">Transaction canceled</p>
    </div>
  );

  return (
    <div className="note-modal">
      {isLoading ? renderLoader : isError ? renderError : renderNoteModal}
    </div>
  );
};

export const ProcessModal = () => {
  //RENDERING LOADER

  const renderLoader = (
    <div className="loader">
      <img src={loader} alt="loader" />
      <p className="txt-reg-16-txt-sec">Withdrawl on progress</p>
      <div>
        <p className="txt-reg-14-txt-sec">Don't refresh or close the tab </p>
        <p className="txt-reg-14-txt-sec">
          until the transaction has been finished
        </p>
      </div>
    </div>
  );

  return <div className="process-modal">{renderLoader}</div>;
};
