import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { CONTRACT_ABI_ERC20 } from "../contracts/SampleERC20";
import Web3 from "web3";
// Hook
export async function validateContractAddress(address) {
	const web3 = new Web3(Web3.givenProvider);
	let contractDetails = { ticker: "", decimal: 10, valid: false };
	let flag = address?.length === 42;
	if (flag) {
		// console.log("hey");
		try {
			const tokenInst = new web3.eth.Contract(CONTRACT_ABI_ERC20, address);
			const tokenSymbol = await tokenInst.methods.symbol().call();
			const tokenDecimal = await tokenInst.methods.decimals().call();
			// console.log(tokenSymbol);
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
