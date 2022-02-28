import BigNumber from "bignumber.js";
import { validateDate } from "./validateDate";

// const DECIMALS = 18;
const DAY = 86400;

function SafeHTML(address) {
  let convertData = address.replace(/</gi, '&lt')
  return convertData
}

export const verifyVestingData = (data, defaultWeb3, DECIMALS) => {
  let x = 1;
  let spreadsheetErrors = [];
  if (data.length === 0) {
    spreadsheetErrors.push("<b>No data given to vesting sheet!</b>");
  } else {
    var Objkeys = Object.keys(data[0]);
    if (Objkeys.includes("Sr. No.") === false) {
      spreadsheetErrors.push("<b>Column Not Found </b>: Sr. No.");
    }
    if (Objkeys.includes("Address") === false) {
      spreadsheetErrors.push("<b>Column Not Found </b>: Address");
    }
    if (Objkeys.includes("Date(DD-MM-YYYY)") === false) {
      spreadsheetErrors.push("<b>Column Not Found </b>: Date(DD-MM-YYYY)");
    }
    if (Objkeys.includes("Amount of Tokens") === false) {
      spreadsheetErrors.push("<b>Column Not Found </b>: Amount of Tokens");
    }
  }
  if (spreadsheetErrors.length === 0)
    data.forEach(function (table, index) {
      try {
        if (table["Sr. No."] === undefined)
          spreadsheetErrors.push(`<b>MISSING SR. NO.</b> : At Row ${x}`);
        else if (parseInt(table["Sr. No."]) !== x) {
          spreadsheetErrors.push(
            `<b>INVALID SR. NO.</b> : At Row ${x} -` + SafeHTML(table["Sr. No."])
          );
        }
      } catch (err) {
        if (table["Sr. No."] === undefined)
          spreadsheetErrors.push(`<b>MISSING SR. NO.</b> : At Row ${x}`);
        else
          spreadsheetErrors.push(
            `<b>INVALID SR. NO.</b> : At Row ${x} -` + SafeHTML(table["Sr. No."])
          );
      }

      try {
        if (table["Address"] === undefined)
          spreadsheetErrors.push(`<b>MISSING ADDRESS</b> : At Row ${x}`);
        else if (!defaultWeb3.utils.isAddress(table["Address"])) {
          spreadsheetErrors.push(
            `<b>INVALID ADDRESS</b> : At Row test ${x} - ` + SafeHTML(table["Address"])
          );
        }
      } catch (err) {
        if (table["Address"] === undefined)
          spreadsheetErrors.push(`<b>MISSING ADDRESS</b> : At Row ${x}`);
        else
          spreadsheetErrors.push(
            `<b>INVALID ADDRESS</b> : At Row ${x} - ` + SafeHTML(table["Address"])
          );
      }

      try {
        var numberOfTokens = BigNumber(
          table["Amount of Tokens"] * 10 ** DECIMALS
        );
        if (table["Amount of Tokens"] === undefined)
          spreadsheetErrors.push(
            `<b>MISSING AMOUNT OF TOKENS</b> : At Row ${x}`
          );
        else if (isNaN(numberOfTokens) || !(numberOfTokens > 0)) {
          spreadsheetErrors.push(
            `<b>INVALID AMOUNT OF TOKENS</b> : At Row ${x} -` + SafeHTML(table["Amount of Tokens"])
          );
        }
      } catch (err) {
        if (table["Amount of Tokens"] === undefined)
          spreadsheetErrors.push(
            `<b>MISSING AMOUNT OF TOKENS</b> : At Row ${x}`
          );
        else
          spreadsheetErrors.push(
            `<b>INVALID AMOUNT OF TOKENS</b> : At Row ${x} -` + SafeHTML(table["Amount of Tokens"])
          );
      }

      try {
        var kp;
        if (table["Date(DD-MM-YYYY)"].includes("/")) {
          let a = table["Date(DD-MM-YYYY)"].toString().split("/");

          kp = a.join("-");
        } else kp = table["Date(DD-MM-YYYY)"].toString().split("-").join("-");
        var timestamp =
          new Date(
            Date.UTC(kp.split("-")[2], kp.split("-")[1] - 1, kp.split("-")[0])
          ).getTime() / 1000;
        if (!validateDate(kp)) {
          spreadsheetErrors.push(
            `<b>INVALID DATE</b> : At Row ${x} - ${table[
              "Date(DD-MM-YYYY)"
            ].toString()}`
          );
        } else {
          var checkPoint =
            Math.trunc(Math.floor(Date.now() / 1000) / DAY) * DAY + DAY;
          if (timestamp < checkPoint) {
            spreadsheetErrors.push(
              `<b>INVALID DATE</b> : At Row ${x} - ${table[
                "Date(DD-MM-YYYY)"
              ].toString()}`
            );
          }
        }
      } catch (err) {
        if (table["Date(DD-MM-YYYY)"] === undefined)
          spreadsheetErrors.push(`<b>MISSING DATE</b> : At Row ${x}`);
        else
          spreadsheetErrors.push(
            `<b>INVALID DATE</b> : At Row ${x}  -` + SafeHTML(table["Date(DD-MM-YYYY)"])
          );
      }

      x += 1;
    });
  return spreadsheetErrors;
};
