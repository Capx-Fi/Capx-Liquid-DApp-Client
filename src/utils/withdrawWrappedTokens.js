import BigNumber from "bignumber.js";
import Web3 from "web3";

export const withdrawWrappedTokens = async (
	wrappedTokenAddress,
	tokenAmount,
	account,
	capxContract,
	setButtonDisabled,
	setWithdrawModalOpen,
	setWithdrawModalStatus,
	enqueueSnackbar,
	wrappedTokenContract,
	CONTRACT_ADDRESS_CAPX,
	CONTRACT_ADDRESS_CAPX_CONTROLLER,
	tokenDecimal
) => {
	console.log(account);
	setWithdrawModalOpen(true);
	let withdrawResult = null;
	let approvedAmount = null;
	let approveResult = null;
	try {
		approvedAmount = await wrappedTokenContract.methods
			.allowance(account, CONTRACT_ADDRESS_CAPX_CONTROLLER)
			.call();
		console.log(account);
	} catch (err) {
		setWithdrawModalStatus("failure");
	}
	if (approvedAmount) {
		approvedAmount = new BigNumber(approvedAmount);
		if (
			approvedAmount.dividedBy(Math.pow(10, tokenDecimal)).toString(10) === "0"
		) {
			try {
				approveResult = await wrappedTokenContract.methods
					.approve(CONTRACT_ADDRESS_CAPX_CONTROLLER, tokenAmount)
					.send({ from: `${account}` });
			} catch (err) {
				setWithdrawModalStatus("failure");
				console.log(err);
			}
			if (approveResult) {
				enqueueSnackbar("Approval Successful! Please confirm withdrawal.", {
					variant: "success",
				});
			}
		} else {
			let approve0Result = null;
			try {
				approve0Result = await wrappedTokenContract.methods
					.approve(
						CONTRACT_ADDRESS_CAPX_CONTROLLER,
						new BigNumber(0)
							.multipliedBy(Math.pow(10, tokenDecimal))
							.toString(10)
					)
					.send({ from: account });
			} catch (err) {
				setWithdrawModalStatus("failure");
				console.log(err);
			}
			if (approve0Result) {
				try {
					approveResult = await wrappedTokenContract.methods
						.approve(CONTRACT_ADDRESS_CAPX_CONTROLLER, tokenAmount)
						.send({ from: account });
				} catch (err) {
					setWithdrawModalStatus("failure");
					console.log(err);
				}
				if (approveResult) {
					enqueueSnackbar(
						"Approval Successful! please proceed to transfer the tokens.",
						{
							variant: "success",
						}
					);
				}
			}
		}
	}
	if (approveResult) {
		try {
			withdrawResult = await capxContract.methods
				.withdrawWrappedVestingToken(wrappedTokenAddress, tokenAmount)
				.send({ from: account });
			if (withdrawResult) {
				setWithdrawModalStatus("success");
				enqueueSnackbar("Transaction Successful", { variant: "success" });
			} else {
				setWithdrawModalStatus("failure");
				enqueueSnackbar("Sorry transaction failed", { variant: "error" });
				setButtonDisabled(false);
			}
		} catch (err) {
			setWithdrawModalStatus("failure");
			enqueueSnackbar(err.message, { variant: "error" });
			setButtonDisabled(false);
		}
	}
	setTimeout(() => {
		setWithdrawModalOpen(false);
		setWithdrawModalStatus("");
	}, 2500);
};
