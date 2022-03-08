import BigNumber from "bignumber.js";
export const approveToken = async (
  vestingArray,
  tokenDetails,
  metamaskAccount,
  totalTokens,
  vestingTokenContract,
  capxContract,
  CONTRACT_ADDRESS_CAPX,
  tokenApproval,
  setTokenApproval,
  approveModalStatus,
  setApproveModalStatus,
  enqueueSnackbar,
  setApproveModalOpen
) => {
  setApproveModalOpen(true);
  let totalAmount = new BigNumber(totalTokens).multipliedBy(
    Math.pow(10, tokenDetails.decimal)
  );
  let sendAmount = totalAmount.toString(10);
  let approveResult = null;
  let approvedAmount = null;

  try {
    approvedAmount = await vestingTokenContract.methods
      .allowance(metamaskAccount, CONTRACT_ADDRESS_CAPX)
      .call();
  } catch (err) {
    setApproveModalStatus("failure");
    enqueueSnackbar("Token Approval Failed!", { variant: "error" });
    console.log(err);
  }
  if (approvedAmount) {
    approvedAmount = new BigNumber(approvedAmount);
    if (
      approvedAmount
        .dividedBy(Math.pow(10, tokenDetails.decimal))
        .toString(10) === "0"
    ) {
      try {
        approveResult = await vestingTokenContract.methods
          .approve(CONTRACT_ADDRESS_CAPX, sendAmount)
          .send({ from: metamaskAccount });
      } catch (err) {
        setApproveModalStatus("failure");
        enqueueSnackbar("Token Approval Failed!", { variant: "error" });
        console.log(err);
      }
      if (approveResult) {
        setApproveModalStatus("success");
        enqueueSnackbar(
          "Approval Successful! Please proceed to transfer the tokens.",
          { variant: "success" }
        );
        setTokenApproval(true);
      }
    } else {
      let approve0Result = null;
      try {
        approve0Result = await vestingTokenContract.methods
          .approve(
            CONTRACT_ADDRESS_CAPX,
            new BigNumber(0)
              .multipliedBy(Math.pow(10, tokenDetails.decimal))
              .toString(10)
          )
          .send({ from: metamaskAccount });
      } catch (err) {
        setApproveModalStatus("failure");
        enqueueSnackbar("Token Approval Failed!", { variant: "error" });
        console.log(err);
      }
      if (approve0Result) {
        try {
          approveResult = await vestingTokenContract.methods
            .approve(CONTRACT_ADDRESS_CAPX, sendAmount)
            .send({ from: metamaskAccount });
        } catch (err) {
          setApproveModalStatus("failure");
          enqueueSnackbar("Token Approval Failed!", { variant: "error" });
          console.log(err);
        }
        if (approveResult) {
          setApproveModalStatus("success");
          enqueueSnackbar(
            "Approval Successful! please proceed to transfer the tokens.",
            {
              variant: "success",
            }
          );
          setTokenApproval(true);
        }
      }
    }
  }
  setTimeout(() => {
    setApproveModalOpen(false);
    setApproveModalStatus("");
  }, 2500);
};
