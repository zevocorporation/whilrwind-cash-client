import React from "react";

//IMPORTING PATTERNS

import { Card } from "../patterns/";

//IMPORTING MEDIA ASSETS

import depositImg from "../assets/images/deposit.svg";
import transferImg from "../assets/images/transfer.svg";
import withdrawImg from "../assets/images/withdraw.svg";

const Work = () => {
  const renderWorkcard = (
    <>
      <p
        className="title-b-32-txt-pri"
        style={{ textAlign: "center", margin: "1.5em 0" }}
      >
        How does it work
      </p>
      <div className="workcard-container">
        <Card
          title="Deposit"
          image={depositImg}
          description="
                    Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit. A odio neque condimentum libero 
                    adipiscing semper mi, lacus. Nec leo lacinia 
                    lectus mi. Ultrices in eget diam viverra mauris 
                    egestas. Mauris cursus."
        />
        <Card
          title="Transfer"
          image={transferImg}
          description="
                    Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit. A odio neque condimentum libero 
                    adipiscing semper mi, lacus. Nec leo lacinia 
                    lectus mi. Ultrices in eget diam viverra mauris 
                    egestas. Mauris cursus."
        />
        <Card
          title="Withdraw"
          image={withdrawImg}
          description="
                    Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit. A odio neque condimentum libero 
                    adipiscing semper mi, lacus. Nec leo lacinia 
                    lectus mi. Ultrices in eget diam viverra mauris 
                    egestas. Mauris cursus."
        />
      </div>
    </>
  );

  return renderWorkcard;
};

export default Work;
