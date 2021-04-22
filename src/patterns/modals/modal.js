import React, { useState } from "react";

//IMPORTING STYLESHEET

import "../../styles/patterns/modal.scss";

//IMPORTING COMPONENTS

import { Button } from "../../components";

//IMPORTING MEDIA ASSETS

import sucesss from "../../assets/images/depositsuccess.svg";
import close from "../../assets/icons/close.svg";
import copy from "../../assets/icons/copy.svg";

export const SuccessModal = () => {
  return (
    <div className="success-modal">
      <img src={sucesss} alt="success-svg" />
      <p className="title-b-24-txt-pri">Congratulations</p>
      <p className="txt-reg-14-txt-sec">
        Your funds has been transfered into your privacy pool and the can be
        withdrawed with the personal note provided to you.
      </p>
      <Button className="btn-primary">Done for now</Button>
    </div>
  );
};

export const NoteModal = ({ note, setIsNoteModal, deposit }) => {
  const [toast, setToast] = useState(false);
  //HANDLING METHODS

  const handleCopy = () => {
    window.navigator.clipboard.writeText(note);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  //INLINE STYLES

  const inlineStyle = {
    flex: {
      display: "flex",
      alignItems: "center",
      gridGap: 16,
    },
  };

  return (
    <div className="note-modal">
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
      <p className="txt-reg-14-txt-sec note">{note}</p>
      <div className="note-block">
        <p className="txt-reg-16-txt-grad">See note</p>
        <p style={inlineStyle.flex} onClick={() => handleCopy()}>
          <img src={copy} alt="copy" />
          <span>Copy to clipboard</span>
        </p>
        {toast ? <div className="toast">copied</div> : null}
      </div>
      <p style={inlineStyle.flex}>
        <input type="checkbox" />
        <span>I have backed up my personal note</span>
      </p>
      <Button className="btn-primary" onClick={() => deposit()}>
        Deposit
      </Button>
    </div>
  );
};
