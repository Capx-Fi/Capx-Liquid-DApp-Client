import BigNumber from "bignumber.js";

export function totalVested(data) {
  let total = 0;
  data.forEach((element) => {
    // console.log(total, element["Amount of Tokens"]);
    let val = BigNumber(element["Amount of Tokens"]);
    total = BigNumber.sum(total, val);
  });
  return total.toString();
}
