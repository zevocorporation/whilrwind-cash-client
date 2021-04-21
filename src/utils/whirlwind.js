import Web3 from "web3";
import buildGroth16 from "websnark/src/groth16";
import { genWitnessAndProve, toSolidityInput } from "websnark/src/utils";
import merkleTree from "./lib/MerkleTree";
import { fromDecimals, toDecimals } from "./lib/ethConvert.js";
import { deployments as _deployments } from "./lib/config";
import { bigInt as _bigInt } from "snarkjs";
import { randomBytes } from "crypto";
import { babyJub, pedersenHash as _pedersenHash } from "circomlib";
const bigInt = _bigInt;

const rbigint = (nbytes) => _bigInt.leBuff2int(randomBytes(nbytes));
const pedersenHash = (data) => babyJub.unpackPoint(_pedersenHash.hash(data))[0];
function toHex(number, length = 32) {
  const str =
    number instanceof Buffer
      ? number.toString("hex")
      : bigInt(number).toString(16);
  return "0x" + str.padStart(length * 2, "0");
}

let web3 = window.web3;

let BinanceChain = window.BinanceChain;
let next = window.next;

function createDeposit(nullifier, secret) {
  const deposit = { nullifier, secret };
  deposit.preimage = Buffer.concat([
    deposit.nullifier.leInt2Buff(31),
    deposit.secret.leInt2Buff(31),
  ]);
  deposit.commitment = pedersenHash(deposit.preimage);
  deposit.commitmentHex = toHex(deposit.commitment);
  deposit.nullifierHash = pedersenHash(deposit.nullifier.leInt2Buff(31));
  deposit.nullifierHex = toHex(deposit.nullifierHash);
  return deposit;
}

function getCurrencies() {
  return ["BNB", "WIND"];
}

function getAmounts(coin) {
  let denoms = [];
  for (let denom in window.whirlwinds[coin.toLowerCase()]) {
    denoms.push(denom);
  }
  denoms = denoms.sort();
  return denoms;
}

let pendingDeposit;
export const getNote = (currency, amount) => {
  pendingDeposit = createDeposit(rbigint(31), rbigint(31));
  pendingDeposit.currency = getCurrencies()[currency].toLowerCase();
  pendingDeposit.amount = getAmounts(pendingDeposit.currency)[
    amount
  ].toString();
  const note = toHex(pendingDeposit.preimage, 62);
  const noteString = `whirlwind-${pendingDeposit.currency}-${pendingDeposit.amount}-56-${note}`;
  return noteString;
};

export const deposit = async () => {
  let from = window.from;
  let erc20s = window.erc20s;
  const currency = pendingDeposit.currency;
  const amount = pendingDeposit.amount;
  const whirlwind = window.whirlwinds[currency][amount];
  console.log(currency);

  let depositOpts = {
    from,
    gas: 1500000,
    gasPrice: Web3.utils.toWei("10", "gwei"),
  };

  if (currency === "bnb") {
    depositOpts.value = fromDecimals(amount, 18);
  } else {
    if (
      Web3.utils
        .toBN(
          await erc20s[currency].methods
            .allowance(from, whirlwind._address)
            .call()
        )
        .lt(Web3.utils.toBN(fromDecimals(amount, erc20s[currency].decimals)))
    ) {
      // Approve the uint256 maximum
      await erc20s[currency].methods
        .approve(
          whirlwind._address,
          "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
        )
        .send({ from, gas: 80000, gasPrice: Web3.utils.toWei("10", "gwei") });
    }
  }

  console.log(depositOpts);

  // try {
  await whirlwind.methods
    .deposit(toHex(pendingDeposit.commitment))
    .send(depositOpts);
  // } catch (e) {
  //   throw "Error: Transaction failed. Please check your balance.";
  // }
  return "Success! Your funds are now private. Please make sure your note is securely written down or they will be lost forever.";
};

async function generateMerkleProof(whirlwind, deposit) {
  // Get all deposit events from smart contract and assemble merkle tree from them
  console.log("3%");
  const events = await whirlwind.getPastEvents("Deposit");
  console.log("4%");
  const leaves = events
    .sort((a, b) => a.returnValues.leafIndex - b.returnValues.leafIndex) // Sort events in chronological order
    .map((e) => e.returnValues.commitment);
  console.log("5%");
  const tree = new merkleTree(20, leaves);
  console.log("10%");

  // Find current commitment in the tree
  const depositEvent = events.find(
    (e) => e.returnValues.commitment === toHex(deposit.commitment)
  );
  const leafIndex = depositEvent ? depositEvent.returnValues.leafIndex : -1;
  console.log("15%");

  // Validate that our data is correct
  const root = await tree.root();
  const isValidRoot = await whirlwind.methods.isKnownRoot(toHex(root)).call();
  console.log("18%");

  const isSpent = await whirlwind.methods
    .isSpent(toHex(deposit.nullifierHash))
    .call();
  console.log("19%");
  if (!isValidRoot === true) {
    throw new Error(
      "Merkle tree is corrupted. Please contact development@whirlwind.cash."
    );
  }
  if (isSpent) {
    throw new Error("This note was already spent.");
  }
  if (!(leafIndex >= 0)) {
    throw new Error("This deposit was not found.");
  }

  //   // Compute merkle proof of our commitment
  console.log("20%");
  return tree.path(leafIndex);
}

let groth16 = window.groth16;
let circuit = window.circuit;
let proving_key = window.proving_key;
async function generateProof(whirlwind, deposit, recipient) {
  // Compute merkle proof of our commitment
  console.log("2%");
  const { root, path_elements, path_index } = await generateMerkleProof(
    whirlwind,
    deposit
  );

  console.log("22%");

  // Prepare circuit input
  const input = {
    // Public snark inputs
    root: root,
    nullifierHash: deposit.nullifierHash,
    recipient: bigInt(recipient),
    relayer: bigInt(0),
    fee: bigInt(0),
    refund: bigInt(0),

    // Private snark inputs
    nullifier: deposit.nullifier,
    secret: deposit.secret,
    pathElements: path_elements,
    pathIndices: path_index,
  };

  const proofData = await genWitnessAndProve(
    groth16,
    input,
    circuit,
    proving_key
  );
  console.log("30%");
  const { proof } = toSolidityInput(proofData);
  console.log("35%");

  const args = [
    toHex(input.root),
    toHex(input.nullifierHash),
    toHex(input.recipient, 20),
    toHex(input.relayer, 20),
    toHex(input.fee),
    toHex(input.refund),
  ];
  console.log("40%");
  return { proof, args };
}

export const withdraw = async () => {
  let from = window.from;
  const { deposit, currency, amount } = pendingWithdrawal;
  const whirlwind = window.whirlwinds[currency][amount];

  try {
    console.log("1%");
    const { proof, args } = await generateProof(whirlwind, deposit, from);

    console.log("50%");

    await whirlwind.methods.withdraw(proof, ...args).send({
      from,
      gas: 500000,
      gasPrice: web3.utils.toWei("10", "gwei"),
    });
    console.log("100%");
    return "Success!";
  } catch (e) {
    return "Error: " + e.toString();
  }
};

function parseNote(noteString) {
  const noteRegex = /whirlwind-(?<currency>\w+)-(?<amount>[\d.]+)-(?<netId>\d+)-0x(?<note>[0-9a-fA-F]{124})/g;
  const match = noteRegex.exec(noteString);
  if (!match) {
    throw new Error("This isn't a Whirlwind Cash note; the format is invalid.");
  }

  const buf = Buffer.from(match.groups.note, "hex");
  const nullifier = bigInt.leBuff2int(buf.slice(0, 31));
  const secret = bigInt.leBuff2int(buf.slice(31, 62));
  const deposit = createDeposit(nullifier, secret);

  if (Number(match.groups.netId) !== 56) {
    throw new Error("This note is for a different network.");
  }

  return {
    currency: match.groups.currency,
    amount: match.groups.amount,
    deposit,
  };
}
let pendingWithdrawal;
export const getWithdrawInfo = (note) => {
  pendingWithdrawal = parseNote(note);
  return [
    ["Currency", pendingWithdrawal.currency.toUpperCase()],
    ["Amount", pendingWithdrawal.amount],
  ];
};

async function loadDepositData(whirlwind, deposit) {
  console.log("2%");
  const eventWhenHappened = await whirlwind.getPastEvents("Deposit", {
    filter: {
      commitment: deposit.commitmentHex,
    },
  });
  console.log(eventWhenHappened);
  console.log("3%");
  if (eventWhenHappened.length === 0) {
    throw new Error("This note doesn't have a matching deposit.");
  }

  const { timestamp } = eventWhenHappened[0].returnValues;
  const txHash = eventWhenHappened[0].transactionHash;
  const isSpent = await whirlwind.methods.isSpent(deposit.nullifierHex).call();
  const receipt = await web3.eth.getTransactionReceipt(txHash);

  return {
    timestamp,
    txHash,
    isSpent,
    from: receipt.from,
    commitment: deposit.commitmentHex,
  };
}

async function loadWithdrawalData(currency, amount, deposit) {
  let erc20s = window.erc20s;
  const whirlwind = window.whirlwinds[currency][amount];
  try {
    const events = await await whirlwind.getPastEvents("Withdrawal");

    const withdrawEvent = events.filter((event) => {
      return event.returnValues.nullifierHash === deposit.nullifierHex;
    })[0];

    const fee = withdrawEvent.returnValues.fee;
    const decimals = currency === "bnb" ? 18 : erc20s[currency].decimals;
    const withdrawalAmount = web3.utils
      .toBN(fromDecimals(amount, decimals))
      .sub(web3.utils.toBN(fee));
    const { timestamp } = await web3.eth.getBlock(withdrawEvent.blockHash);
    return {
      amount: toDecimals(withdrawalAmount, decimals, 9),
      txHash: withdrawEvent.transactionHash,
      to: withdrawEvent.returnValues.to,
      timestamp,
      nullifier: deposit.nullifierHex,
      fee: toDecimals(fee, decimals, 9),
    };
  } catch (e) {
    console.error("loadWithdrawalData", e);
  }
}

export const getFullInfo = async (note) => {
  const { currency, amount, deposit } = parseNote(note);
  console.log("1%");
  const depositInfo = await loadDepositData(
    window.whirlwinds[currency][amount],
    deposit
  );
  const depositDate = new Date(depositInfo.timestamp * 1000);
  let result = [[], []];
  result[0].push("Currency:");
  result[1].push(currency.toUpperCase());
  result[0].push("Amount:");
  result[1].push(amount);
  result[0].push("Date:");
  result[1].push(
    depositDate.toLocaleDateString() + " " + depositDate.toLocaleTimeString()
  );
  result[0].push("Transaction:");
  result[1].push(
    `<a href="https://bscscan.com/tx/${depositInfo.txHash}">${
      depositInfo.txHash.substr(0, 12) +
      "..." +
      depositInfo.txHash.substr(54, 66)
    }</a>`
  );
  result[0].push("Commitment:");
  result[1].push(
    depositInfo.commitment.substr(0, 12) +
      "..." +
      depositInfo.commitment.substr(54, 66)
  );

  if (depositInfo.isSpent) {
    const withdrawInfo = await loadWithdrawalData(currency, amount, deposit);
    const withdrawalDate = new Date(withdrawInfo.timestamp * 1000);

    result.push([]);
    result.push([]);

    result[2].push("Fee:");
    result[3].push("0");
    result[2].push("Amount:");
    result[3].push(amount);
    result[2].push("Date:");
    result[3].push(
      withdrawalDate.toLocaleDateString() +
        " " +
        withdrawalDate.toLocaleTimeString()
    );
    result[2].push("Transaction:");
    result[3].push(
      `<a href="https://bscscan.com/tx/${withdrawInfo.txHash}">${
        withdrawInfo.txHash.substr(0, 12) +
        "..." +
        withdrawInfo.txHash.substr(54, 66)
      }</a>`
    );
    result[2].push("To:");
    result[3].push(
      `<a href="https://bscscan.com/address/${withdrawInfo.to}">${
        withdrawInfo.to.substr(0, 12) + "..." + withdrawInfo.to.substr(30, 42)
      }</a>`
    );
  }
  return result;
};

// Relevant parts of the ERC20 ABI
const ERC20_RELEVANT_ABI = [
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

// Relevant parts of the Whirlwind ABI.
const WHIRLWIND_RELEVANT_ABI = [
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
      { indexed: false, internalType: "address", name: "to", type: "address" },
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
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
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
      { internalType: "address payable", name: "_recipient", type: "address" },
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

// Load everything
export const init = async () => {
  // Load every Whirlwind
  window.window.whirlwinds = {};
  window.erc20s = {};
  let deployments = _deployments["netId56"];
  let first = true;
  for (let coin in deployments) {
    window.whirlwinds[coin] = {};
    for (const instance in deployments[coin].instanceAddress) {
      let whirlwind = new web3.eth.Contract(
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
        let start = 5772274;
        let currHeight = await web3.eth.getBlockNumber();
        let res = [];
        while (start < currHeight) {
          settings.fromBlock = start;
          next = Math.min(start + 5000, currHeight);
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
      window.erc20s[coin] = new web3.eth.Contract(
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
