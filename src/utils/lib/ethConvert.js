const Web3 = require("web3");
let web3 = Web3;

function fromDecimals(amount, decimals) {
  amount = amount.toString();
  let ether = amount.toString();
  const base = new web3.utils.BN("10").pow(new web3.utils.BN(decimals));
  const baseLength = base.toString(10).length - 1 || 1;

  if (ether === ".") {
    throw new Error(
      "[ethjs-unit] while converting number " +
        amount +
        " to wei, invalid value"
    );
  }

  // Split it into a whole and fractional part
  const comps = ether.split(".");
  if (comps.length > 2) {
    throw new Error(
      "[ethjs-unit] while converting number " +
        amount +
        " to wei,  too many decimal points"
    );
  }

  let whole = comps[0];
  let fraction = comps[1];

  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }
  if (fraction.length > baseLength) {
    throw new Error(
      "[ethjs-unit] while converting number " +
        amount +
        " to wei, too many decimal places"
    );
  }

  while (fraction.length < baseLength) {
    fraction += "0";
  }

  whole = new web3.utils.BN(whole);
  fraction = new web3.utils.BN(fraction);
  let wei = whole.mul(base).add(fraction);

  return new web3.utils.BN(wei.toString(10), 10);
}

function toDecimals(value, decimals, fixed) {
  const zero = new web3.utils.BN(0);
  decimals = decimals || 18;
  fixed = fixed || 7;

  value = new web3.utils.BN(value);
  const base = new web3.utils.BN("10").pow(new web3.utils.BN(decimals));
  const baseLength = base.toString(10).length - 1 || 1;

  let fraction = value.mod(base).toString(10);
  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }
  fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];

  const whole = value.div(base).toString(10);
  value = `${whole}${fraction === "0" ? "" : `.${fraction}`}`;

  if (fixed) {
    value = value.slice(0, fixed);
  }

  return value;
}

module.exports = { fromDecimals, toDecimals };
