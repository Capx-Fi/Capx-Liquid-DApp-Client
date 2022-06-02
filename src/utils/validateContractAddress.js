import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { CONTRACT_ABI_ERC20 } from "../contracts/SampleERC20";
import Web3 from "web3";
// Hook

export async function validateContractAddress(address, web3) {
	web3 && console.log(web3);
	let contractDetails = { ticker: "", decimal: 10, valid: false };
	let flag = address?.length === 42;
	if (flag) {
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
	} else {
		return contractDetails;
	}
}
