import React, { useState } from "react";

//IMPORTING WEB3

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

function ConnectWallet() {
  const [address, updatedAddress] = useState("Connect wallet");
  const [balance, updatedBalance] = useState("Connect wallet to show balance");
  const checkNetwork = async () => {
    const provider = await detectEthereumProvider();
    const web3 = new Web3(provider);
    const network = await web3.eth.net.getId();
    console.log(network);
    if (network == 56) {
      alert("Binance Chain");
    }

    // return true
    // else return false
  };
  const connect = async () => {
    // CONNECTING METAMASK WALLET

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      updatedAddress(accounts[0]);
      console.log("Address", accounts[0]);

      const web3 = new Web3(window.ethereum);
      const balance1 = await web3.eth.getBalance(accounts[0]);
      const balance2 = web3.utils.fromWei(balance1, "ether");
      updatedBalance(balance2 + "  eth");
      console.log(balance2);
    }
    return false;
  };
  window.ethereum.on("accountsChanged", async function (accounts) {
    window.location.reload(true);
    await connect();

    console.log(accounts);
  });

  return (
    <div>
      <button onClick={() => connect()}>{address}</button>
      <button onClick={() => checkNetwork()}>Checknetwork</button>
    </div>
  );
}

export default ConnectWallet;
