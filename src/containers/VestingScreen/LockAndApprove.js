import React, { useEffect, useState } from "react";
import Level3CTA from "../../components/CTA/Level3CTA";

import LockIcon from "../../assets/lock-current.svg";
import CheckIcon from "../../assets/check-current.svg";
import { totalVested } from "../../utils/totalVested";
import { approveToken } from "../../utils/approveTokens";
import { lockTokens } from "../../utils/lockTokens";
import { CONTRACT_ABI_ERC20 } from "../../contracts/SampleERC20";
import Web3 from "web3";
import { CONTRACT_ABI_CAPX } from "../../contracts/CapxController";
import { PinataAPIKey, PinataSecretKey } from "../../constants/config";
import { useSnackbar } from "notistack";
import ApproveModal from "../../components/Modal/VestAndApproveModal/ApproveModal";
import VestModal from "../../components/Modal/VestAndApproveModal/VestModal";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

import "./VestingScreen.scss";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { getContractAddress } from "../../constants/getChainConfig";

function LockAndApprove({
	setStep,
	uploadedFile,
	vestingArray,
	tokenDetails,
	contractDetails,
	metamaskAccount,
	projectExists,
	approveModalOpen,
	setApproveModalOpen,
	vestModalOpen,
	setVestModalOpen,
	totalAddresses,
	uniqueAddresses,
	tokenTicker,
}) {
	const web3 = new Web3(Web3.givenProvider);
	window.w3 = web3;
	const { chainId } = useWeb3React();

	const CONTRACT_ADDRESS_CAPX = chainId && getContractAddress(chainId);

	const { t } = useTranslation();
	const [buttonClicked, setButtonClicked] = useState(false);
	const [approveModalStatus, setApproveModalStatus] = useState("");
	const [tokenApproval, setTokenApproval] = useState(false);
	const [checkTokenApproval, setCheckTokenApproval] = useState(false);
	// const [approveModalOpen, setApproveModalOpen] = useState(true);
	// const [vestModalOpen, setVestModalOpen] = useState(false);
	const [vestModalStatus, setVestModalStatus] = useState("");
	const totalTokens = totalVested(vestingArray);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const vestingTokenContract = new web3.eth.Contract(
		CONTRACT_ABI_ERC20,
		contractDetails.contractAddress
	);
	const capxContract = new web3.eth.Contract(
		CONTRACT_ABI_CAPX,
		CONTRACT_ADDRESS_CAPX
	);
	useEffect(() => {
		async function getApproval() {
			let approvedAmount = null;
			let totalAmount = new BigNumber(totalTokens).multipliedBy(
				Math.pow(10, tokenDetails.decimal)
			);
			try {
				approvedAmount = await vestingTokenContract.methods
					.allowance(metamaskAccount, CONTRACT_ADDRESS_CAPX)
					.call();
				approvedAmount = new BigNumber(approvedAmount);
				if (approvedAmount.isGreaterThanOrEqualTo(totalAmount)) {
					setTokenApproval(true);
				}
			} catch (err) {
				console.log(err);
			}
			setCheckTokenApproval(true);
		}
		getApproval();
	}, [metamaskAccount]);
	function toPlainString(num) {
		return ("" + +num).replace(
			/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
			function (a, b, c, d, e) {
				return e < 0
					? b + "0." + Array(1 - e - c.length).join(0) + c + d
					: b + c + d + Array(e - d.length + 1).join(0);
			}
		);
	}
	const TryApproveToken = async () => {
		setButtonClicked(true);
		await approveToken(
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
		);
		setButtonClicked(false);
	};
	const TryLockToken = async () => {
		setButtonClicked(true);
		const totalTokens = totalVested(vestingArray);
		await lockTokens(
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
		);
		setButtonClicked(false);
	};
	return (
		<div className="lock_approve">
			<ApproveModal
				open={approveModalOpen}
				setOpen={setApproveModalOpen}
				approveModalStatus={approveModalStatus}
				setApproveModalStatus={setApproveModalStatus}
			/>
			<VestModal
				open={vestModalOpen}
				setOpen={setVestModalOpen}
				vestModalStatus={vestModalStatus}
				setVestModalStatus={setVestModalStatus}
			/>

			<div className="flex phone:flex-col screen:flex-row justify-between mt-8 text-greylabel2 phone:text-caption-3 screen:text-caption-3 screen:leading-caption-2 desktop:text-caption-1 desktop:leading-caption-1">
				<div className="flex flex-col justify-center">
					<div>Number of unique addresses: {uniqueAddresses}</div>
					<div>Total addresses: {totalAddresses}</div>
				</div>
				<div className="flex flex-row gap-x-6">
					<div
						className={`lowercontainer_button rounded-lg justify-center items-center flex my-3 screen:px-2 desktop:px-2 py-2 screen:w-36 desktop:w-40 cursor-pointer ${
							(tokenApproval || buttonClicked) &&
							"opacity-50 pointer-events-none z-10"
						}`}
					>
						<div
							className="button_text flex text-black phone:px-4 phone:pr-3 screen:pr-4 screen:text-caption-1 twok:text-paragraph-2 leading-paragraph-2 font-bold"
							onClick={() => {
								TryApproveToken();
							}}
						>
							<div className="flex items-center phone:text-caption-3 screen:text-caption-2 desktop:text-caption-1">
								{"Approve"}
							</div>
							<img
								src={CheckIcon}
								alt="Check Icon"
								className="svg_black inline-block phone:w-4 screen:w-4 desktop:w-5 ml-3 mr-2"
							></img>
						</div>
					</div>

					<div
						className={`lowercontainer_button rounded-lg justify-center items-center flex my-3 phone:px-4 phone:pr-2 screen:pr-4 desktop:px-2 py-2 screen:w-36 desktop:w-40 cursor-pointer ${
							(!tokenApproval || buttonClicked) &&
							"opacity-50 pointer-events-none z-10"
						}`}
					>
						<div
							className="button_text flex text-black screen:text-caption-1 twok:text-paragraph-2 leading-paragraph-2 font-bold"
							onClick={() => {
								TryLockToken();
							}}
						>
							<div className="flex items-center phone:text-caption-3 screen:text-caption-2 desktop:text-caption-1">
								{tokenTicker.length > 3 ? "Lock" : "Lock " + tokenTicker}
							</div>
							<img
								src={LockIcon}
								alt="Lock Icon"
								className="svg_black inline-block phone:w-4 desktop:w-5 ml-3 mr-2"
							></img>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LockAndApprove;
