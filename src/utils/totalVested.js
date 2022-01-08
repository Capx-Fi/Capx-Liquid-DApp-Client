import BigNumber from "bignumber.js";
// function toPlainString(num) {
//   return ("" + +num).replace(
//     /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
//     function (a, b, c, d, e) {
//       return e < 0
//         ? b + "0." + Array(1 - e - c.length).join(0) + c + d
//         : b + c + d + Array(e - d.length + 1).join(0);
//     }
//   );
// }
// var countDecimals = function (value) {
//   value = BigNumber(value["Amount of Tokens"]);
//   console.log(toPlainString(value.toString()), "value");

//   if (Math.floor(value) === value) return 0;
//   return toPlainString(value.toString()).split(".")[1].length || 0;
// };

export function totalVested(data) {
  let maxFix = 0;
  let dec = 0;
  // data.forEach((element) => {
  //   dec = countDecimals(element);
  //   if (maxFix < dec) maxFix = dec;
  // });
  // console.log(maxFix);
  let total = 0;
  data.forEach((element) => {
    console.log(total, element["Amount of Tokens"]);
    let val = BigNumber(element["Amount of Tokens"]);
    total = BigNumber.sum(total, val);
  });
  // total = Number.parseFloat(total).toFixed(maxFix);
  return total.toString();
}
