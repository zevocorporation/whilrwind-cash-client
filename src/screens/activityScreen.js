import React from "react";

//IMPORTING STYLESHEET

import "../styles/screens/activity.scss";

//IMPORTING PATTERNS

import { Footer, Wallet } from "../patterns";

//IMPORTING MEDIA ASSETS

import info from "../assets/icons/info.svg";
import copy from "../assets/icons/copy.svg";

const ActivityScreen = () => {
  async function getTransactions() {
    //let transactions = fetch(https://api.bscscan.com/api?module=account&action=txlist&address=0x0000000000000000000000000000000000001004&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken)
  }
  const lists = [
    "Choose a token",
    "Select amount to deposit",
    "Click Deposit",
    " Save the note",
    "Click deposit funds",
    "Confirm the transaction",
    "Wait until transaction is mined",
  ];

  const queries = [
    "Enter your deposit note",
    "Select recipient",
    "If someone else",
    "Enter recipient address",
    "Click Withdraw funds",
    "Wait until proof is generated",
    "Click Withdraw",
    "Sign transaction",
    "Wait until transaction is mined",
    "Done!",
  ];

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

  const renderTransactionDetails = (
    <div className="transaction-history">
      <table>
        <tbody>
          <tr className="txt-reg-14-txt-sec">
            <th>Amount</th>
            <th>Token type</th>
            <th>Account ID</th>
            <th>Timestamp</th>
          </tr>
          <tr>
            <td>0.1</td>
            <td>DAI</td>
            <td>
              <span>0xDD4c48C0B24031.....</span>
              <img src={copy} alt="copy" />
            </td>
            <button onClick={() => getTransactions()} />
            <td>15:34, 08 Apr 21</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderResources = (
    <div className="resources">
      <p className="title-b-24-txt-pri">Resources</p>
      <p className="title-b-16-txt-pri">How to make a deposit?</p>
      <ul>
        {lists.map((list, index) => {
          return (
            <li key={index} className="txt-reg-14-txt-sec">
              {list}
            </li>
          );
        })}
      </ul>
      <p className="title-b-16-txt-pri">How to withdraw with metamask?</p>
      <ul>
        {queries.map((query, index) => {
          return (
            <li key={index} className="txt-reg-14-txt-sec">
              {query}
            </li>
          );
        })}
      </ul>
    </div>
  );

  const renderScreen = (
    <div className="activity-screen">
      {renderInfo}
      <div className="activity-block">
        <div className="activity-details">
          <Wallet
            variant="activity"
            title="activity"
            details="Activity is used to get info about a every 
                        transaction occured in Whirlwind, such as deposits, 
                        withdrawals and more."
          />
          <div className="transaction-type">
            <p>Deposits</p>
            <p>Withdrawals</p>
            <p>Compliances generated</p>
          </div>
          {renderTransactionDetails}
        </div>
        {renderResources}
      </div>
    </div>
  );

  return (
    <>
      {renderScreen}
      <Footer />
    </>
  );
};

export default ActivityScreen;
