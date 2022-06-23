import React from "react";
import Level3CTA from "../../components/CTA/Level3CTA";
import { totalVested } from "../../utils/totalVested";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";

import "./customScrollbar.css";
import ReviewTableContainer from "./ReviewTableContainer";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
import "./VestingScreen.scss";
import "./LockAndApprove";
import LockAndApprove from "./LockAndApprove";

function Review({
	setStep,
	vestingArray,
	setVestingDataSellable,
	setVestingDataWrapped,
	tokenTicker,
	uploadedFile,
	tokenDetails,
	contractDetails,
	metamaskAccount,
	projectExists,
	approveModalOpen,
	setApproveModalOpen,
	vestModalOpen,
	setVestModalOpen,
}) {
	const { t } = useTranslation();
	const [approveMessage, setApproveMessage] = React.useState(
		"Please approve your tokens before locking them"
	);

	const totalAddresses = vestingArray.length;
	const uniqueAddresses = [...new Set(vestingArray.map((item) => item.address))]
		.length;

	return (
		<div className="pt-10 reviewDiv">
			<div className="flex flex-row justify-between items-center">
				<div className="flex flex-col">
					<p className="screen:text-heading-2 screen:leading-heading-2 desktop:text-40px twok:text-54px desktop:leading-heading-1 screen:font-semibold twok:font-bold desktop:mb-2 twok:mb-4">
						{t("review")}
					</p>
					<p className="desktop:text-caption-1 twok:text-paragraph-1 text-grayText font-semibold mb-4">
						{approveMessage}
					</p>
				</div>
				<br />
				<div className="desktop:text-paragraph-2 flex flex-col phone:flex-row justify-center items-center phone:text-caption-3 screen:text-caption-2 screen:leading-caption-2 tablet:text-caption-3 text-caption-4 twok:-mt-12 font-normal mb-3">
					<p className="w-full text-right tablet:mr-3 tablet:text-center tablet:w-fit-content">
						{"Total Amount:"}
					</p>
					<div className="phone:ring-2 text-center phone:w-40 screen:w-38 ring-black justify-center ml-2 phone:px-0 h-fit-content rounded-lg laptop:rounded-xl desktop:text-paragraph-2 flex phone:flex-col screen:flex-row laptop:text-caption-1 tablet:text-caption-3 text-caption-4 text-black font-semibold  tablet:ring-black tablet:px-4 py-2">
						{convertToInternationalCurrencySystem(totalVested(vestingArray))}{" "}
						{tokenTicker}
					</div>
				</div>
			</div>
			<div className="phone:hidden screen:mb-8 desktop:mb-12 text-graylabel text-caption-2 leading-caption-2">
				Please approve your tokens before locking them
			</div>
			<div className="bg-dark-400  h-fit-content rounded-xl flex-grow overflow-auto w-full">
				<ReviewTableContainer
					reviewData={vestingArray}
					setVestingDataSellable={setVestingDataSellable}
					setVestingDataWrapped={setVestingDataWrapped}
				/>
			</div>
			<hr className="border-dark-25 mt-10 h-2"></hr>
			<LockAndApprove
				setStep={setStep}
				uploadedFile={uploadedFile}
				vestingArray={vestingArray}
				tokenDetails={tokenDetails}
				contractDetails={contractDetails}
				metamaskAccount={metamaskAccount}
				projectExists={projectExists}
				approveModalOpen={approveModalOpen}
				setApproveModalOpen={setApproveModalOpen}
				vestModalOpen={vestModalOpen}
				setVestModalOpen={setVestModalOpen}
				totalAddresses={totalAddresses}
				uniqueAddresses={uniqueAddresses}
				tokenTicker={tokenTicker}
				setApproveMessage={setApproveMessage}
			/>
		</div>
	);
}

export default Review;
