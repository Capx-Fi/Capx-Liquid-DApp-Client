import BigNumber from "bignumber.js";

export const withdrawVestedTokens = async (
	wrappedTokenAddress,
	tokenAmount,
	account,
	capxContract,
	setButtonDisabled,
	setWithdrawModalOpen,
	setWithdrawModalStatus,
	enqueueSnackbar,
	CONTRACT_ADDRESS_CAPX,
	vestID
) => {
	console.log(account);
	setWithdrawModalOpen(true);
	let withdrawResult = null;
	try {
		withdrawResult = await capxContract.methods
			.withdrawVestingLock(vestID)
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

	setTimeout(() => {
		setWithdrawModalOpen(false);
		setWithdrawModalStatus("");
	}, 2500);
};
