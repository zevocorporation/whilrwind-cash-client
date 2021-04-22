import React from "react";

//IMPORTING STYLESHEETS

import "../../styles/patterns/modal.scss";

//IMPORTING COMPONENTS

import { Button } from "../../components";
import Web3 from "web3";
import { deployments as _deployments } from "../../utils/lib/config";
import buildGroth16 from "websnark/src/groth16";

//IMPORTING MEDIA ASSETS

import metamask from "../../assets/images/metamask.png";
import binanceLogo from "../../assets/images/binance.jpg";

//ERC20 WHIRLWIND ABI

export const ERC20_RELEVANT_ABI = [
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

//RELEVANT PARTS OF THE WHIRLWIND ABI
export const WHIRLWIND_RELEVANT_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "leafIndex",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "nullifierHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "relayer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "denomination",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "bytes32", name: "_root", type: "bytes32" }],
    name: "isKnownRoot",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "bytes32", name: "_commitment", type: "bytes32" }],
    name: "deposit",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "bytes", name: "_proof", type: "bytes" },
      { internalType: "bytes32", name: "_root", type: "bytes32" },
      { internalType: "bytes32", name: "_nullifierHash", type: "bytes32" },
      {
        internalType: "address payable",
        name: "_recipient",
        type: "address",
      },
      { internalType: "address payable", name: "_relayer", type: "address" },
      { internalType: "uint256", name: "_fee", type: "uint256" },
      { internalType: "uint256", name: "_refund", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "bytes32", name: "_nullifierHash", type: "bytes32" },
    ],
    name: "isSpent",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

//ON LOAD
const init = async () => {
  // Load every Whirlwind
  window.window.whirlwinds = {};
  window.erc20s = {};
  let deployments = _deployments["netId56"];
  let first = true;
  for (let coin in deployments) {
    window.whirlwinds[coin] = {};
    for (const instance in deployments[coin].instanceAddress) {
      let whirlwind = new window.web3.eth.Contract(
        WHIRLWIND_RELEVANT_ABI,
        deployments[coin].instanceAddress[instance]
      );

      // Implement a chunked getPastEvents
      // BSC only allows a 5000 block range
      whirlwind.actualGetPastEvents = whirlwind.getPastEvents;
      whirlwind.getPastEvents = async (name, settings) => {
        if (!settings) {
          settings = {};
        }

        // Deployment height
        //let start = 5772274;
        let start = 6777777;
        let currHeight = await window.web3.eth.getBlockNumber();
        let res = [];
        while (start < currHeight) {
          console.log(start);
          settings.fromBlock = start;
          let next = Math.min(start + 5000, currHeight);
          settings.toBlock = next;
          res = res.concat(await whirlwind.actualGetPastEvents(name, settings));
          start = next;
        }
        return res;
      };

      window.whirlwinds[coin][instance] = whirlwind;
    }

    // If this is an ERC20, provide an instance
    if (coin !== "bnb") {
      window.erc20s[coin] = new window.web3.eth.Contract(
        ERC20_RELEVANT_ABI,
        deployments[coin].tokenAddress
      );
      window.erc20s[coin].decimals = deployments[coin].decimals;
    }
  }

  // zk-SNARKS data
  window.groth16 = await buildGroth16();
  window.circuit = await (await fetch("/withdraw.json")).json();
  window.proving_key = await (
    await fetch("/withdraw_proving_key.bin")
  ).arrayBuffer();
};

const ConnectModal = ({ setIsConnectPopup }) => {
  //HANDLING BINANCE WALLET

  const handleBinance = async () => {
    // Enable Ethereum
    // Workaround for the Binance Wallet extension on Chrome, which has a significantly delayed loading time
    // Sleeps for up to a second to try to find it
    if (window.BinanceChain) {
      window.web3 = new Web3(window.BinanceChain);
      window.from = (
        await window.BinanceChain.request({ method: "eth_accounts" })
      )[0];
      if (parseInt(window.BinanceChain.chainId) !== 56) {
        await window.BinanceChain.switchNetwork("bsc-mainnet");
      }
      await init().catch(function (e) {
        console.log(e);
      });
      setIsConnectPopup(false);
    } else {
      alert("Binance Wallet not detected.Install BinanceWallet and try again");
    }
  };

  //HANDLING METAMASK WALLET

  const handleMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.from = (
        await window.ethereum.request({
          jsonrpc: "2.0",
          method: "eth_requestAccounts",
          id: null,
        })
      )[0];
      if ((await window.web3.eth.net.getId()) !== 56) {
        alert(
          "This site is for use with the Binance Smart Chain mainnet. Please switch to it to use this site."
        );
        throw "";
      }
      await init().catch(function (e) {
        console.log(e);
      });
      setIsConnectPopup(false);
    } else {
      alert("Metamask not detected.Install metamask wallet and try again");
    }
  };

  // Relevant parts of the ERC20 ABI

  return (
    <div className="connect-modal">
      <div onClick={() => handleBinance()}>
        <img src={binanceLogo} alt="binance" />
        <p>Binance</p>
      </div>
      <div onClick={() => handleMetamask()}>
        <img src={metamask} alt="metamask" />
        <p>Metamask</p>
      </div>
    </div>
  );
};

export default ConnectModal;

export const ConnectWalletWarningModal = () => {
  return (
    <div className="warning-modal">
      <img src={metamask} ait="metamask-logo" />
      <p>Connect Wallet</p>
      <p>
        Connect your Metamask account to Whirlwind.Cash for continuing
        transactions.
      </p>
      <Button className="btn-primary">Connect</Button>
    </div>
  );
};
