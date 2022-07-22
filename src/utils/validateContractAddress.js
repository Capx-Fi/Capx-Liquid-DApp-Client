import { useState, useEffect } from "react";
import { CONTRACT_ABI_ERC20 } from "../contracts/SampleERC20";
import Web3 from "web3";
import { getMint } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";
// Hook

export async function validateContractAddress(
  address,
  web3,
  isSolana,
  solanaConnection
) {
  // web3 && console.log(web3);
  let contractDetails = { ticker: "", decimal: 10, valid: false };
  let flag = isSolana ? address?.length === 44 : address?.length === 42;
  if (flag) {
    if (isSolana) {
      //TODO: Validate Solana Project Address
      try {
        // const tokenInst =
        //   web3 && new web3.eth.Contract(CONTRACT_ABI_ERC20, address);
        // console.dir(tokenInst);
        // const tokenSymbol = await tokenInst?.methods?.symbol().call();
        // const tokenDecimal = await tokenInst?.methods?.decimals().call();
        // if (tokenSymbol && tokenDecimal) {
        //   contractDetails.ticker = tokenSymbol;
        //   contractDetails.decimal = tokenDecimal;
        //   contractDetails.valid = flag;
        //   return contractDetails;
        // } else {
        //   flag = false;
        //   contractDetails.valid = flag;
        //   return contractDetails;
        // }

        try {
          let condata = await getMint(solanaConnection, new PublicKey(address));
          await console.log(condata);
          contractDetails.decimal = condata.decimals;
          contractDetails.valid = flag;
          return contractDetails;
        } catch (error) {
          await console.log(error);
        }
      } catch (err) {
        console.log(err);
        flag = false;
        contractDetails.valid = flag;
        return contractDetails;
      }
    } else {
      try {
        const tokenInst =
          web3 && new web3.eth.Contract(CONTRACT_ABI_ERC20, address);
        console.dir(tokenInst);
        const tokenSymbol = await tokenInst?.methods?.symbol().call();
        const tokenDecimal = await tokenInst?.methods?.decimals().call();
        if (tokenSymbol && tokenDecimal) {
          contractDetails.ticker = tokenSymbol;
          contractDetails.decimal = tokenDecimal;
          contractDetails.valid = flag;
          return contractDetails;
        } else {
          flag = false;
          contractDetails.valid = flag;
          return contractDetails;
        }
      } catch (err) {
        console.log(err);
        flag = false;
        contractDetails.valid = flag;
        return contractDetails;
      }
    }
  } else {
    return contractDetails;
  }
}
