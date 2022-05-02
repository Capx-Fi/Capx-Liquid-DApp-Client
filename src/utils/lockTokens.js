import BigNumber from "bignumber.js";
import { totalVested } from "./totalVested";

const pinataSDK = require("@pinata/sdk");

export const lockTokens = async (
  PinataAPIKey,
  PinataSecretKey,
  contractDetails,
  tokenDetails,
  totalTokens,
  metamaskAccount,
  vestingArray,
  vestingTokenContract,
  capxContract,
  CONTRACT_ADDRESS_CAPX,
  setButtonClicked,
  setVestModalOpen,
  setVestModalStatus,
  enqueueSnackbar,
  setStep
) => {
  setVestModalOpen(true);
  let vDate = [];
  let vAddress = [];
  let vAmount = [];
  let vTotalAmount = 0;
  let lDate = [];
  let lAddress = [];
  let lAmount = [];
  let lTotalAmount = 0;
  let lSellable = [];

  const pinata = pinataSDK(PinataAPIKey, PinataSecretKey);
  const dateFormat = (dat) => {
    var kp;
    if (dat.includes("/")) {
      let a = dat.toString().split("/");

      kp = a.join("-");
    } else kp = dat.toString().split("-").join("-");

    // var timestamp =
    //   new Date(kp.toString().split("-").reverse().join("-")).getTime() / 1000;
    var timestamp = new Date (
      Date.UTC(
        kp.split("-")[2],
        kp.split("-")[1] - 1,
        kp.split("-")[0]
      )
    ).getTime() / 1000;
    return timestamp;
  };
  const amountFormat = (amt) => {
    return new BigNumber(amt).multipliedBy(Math.pow(10, tokenDetails.decimal));
  };
  let totalAmount = new BigNumber(totalTokens).multipliedBy(
    Math.pow(10, tokenDetails.decimal)
  );
  vestingArray.forEach((table) => {
    if (table["isWrapped"]) {
      lAddress.push(table["Address"]);
      lDate.push(dateFormat(table["Date(DD-MM-YYYY)"]));
      lAmount.push(amountFormat(table["Amount of Tokens"]).toString(10));
      lSellable.push(table["isSellable"]);
    } else {
      vAddress.push(table["Address"]);
      vDate.push(dateFormat(table["Date(DD-MM-YYYY)"]));
      vAmount.push(amountFormat(table["Amount of Tokens"]).toString(10));
    }
  });
  lAmount.forEach((amt) => {
        lTotalAmount = BigNumber.sum(lTotalAmount, BigNumber(amt));
  });
  vAmount.forEach((amt) => {
        vTotalAmount = BigNumber.sum(vTotalAmount, BigNumber(amt));
  });
  setVestModalOpen(true);
  let buyResult = null;
  let pinataHash = null;
  // console.log("contractDetails", contractDetails.projectDescription);
  let projectDescription = contractDetails.projectDescription.replace(
    /\n\r?/g,
    "<br />"
  );
  try {
    pinataHash = await pinata.pinJSONToIPFS({
      description: projectDescription,
    });
  } catch (err) {
    console.log(err);
    enqueueSnackbar("Transaction failed! Please try again.", { variant: "error" });
    setButtonClicked(false);
    setVestModalStatus("failure");
      setTimeout(() => {
        setVestModalOpen(false);
        setVestModalStatus("");
      }, 2500);
  }
  // console.log(totalAmount, "taa");
  let allowedAmount = await vestingTokenContract.methods
    .allowance(metamaskAccount, contractDetails.contractAddress)
    .call();
  try {
    buyResult = await capxContract.methods
      .createBulkDerivative(
        contractDetails.projectTitle,
        pinataHash.IpfsHash.toString(),
        contractDetails.contractAddress,
        [lTotalAmount.toString(10), vTotalAmount.toString(10)],
        lAddress,
        lDate,
        lAmount,
        lSellable,
        vAddress,
        vDate,
        vAmount,
      )
      .send({ from: metamaskAccount });
    if (buyResult) {
      setVestModalStatus("success");
      enqueueSnackbar("Transaction Successful", { variant: "success" });
      setTimeout(() => {
        setStep(4);
      }, 2500);
    } else {
      setVestModalStatus("failure");
      enqueueSnackbar("Transaction failed! Please try again.", {
        variant: "error",
      });
      setButtonClicked(false);
    }
  } catch (err) {
    setVestModalStatus("failure");
    enqueueSnackbar("Transaction failed! Please try again.", {
      variant: "error",
    });
    setButtonClicked(false);
  }

  setTimeout(() => {
    setVestModalOpen(false);
    setVestModalStatus("");
  }, 2500);
};
