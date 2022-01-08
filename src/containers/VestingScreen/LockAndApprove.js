import React, { useState } from "react";
import Level3CTA from "../../components/CTA/Level3CTA";

import LockIcon from "../../assets/lock.png";
import InfoIcon from "../../assets/Info.png";
import { totalVested } from "../../utils/totalVested";
import { approveToken } from "../../utils/approveTokens";
import { lockTokens } from "../../utils/lockTokens";
import { CONTRACT_ABI_ERC20 } from "../../contracts/SampleERC20";
import Web3 from "web3";
import { CONTRACT_ABI_CAPX } from "../../contracts/CapxController";
import {
  PinataAPIKey,
  PinataSecretKey,
  CONTRACT_ADDRESS_CAPX_RINKEBY,
  CONTRACT_ADDRESS_CAPX_BSC,
  CONTRACT_ADDRESS_CAPX_MATIC,
} from "../../constants/config";
import { useSnackbar } from "notistack";
import ApproveModal from "../../components/Modal/VestAndApproveModal/ApproveModal";
import VestModal from "../../components/Modal/VestAndApproveModal/VestModal";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

import "./VestingScreen.scss";
import { useWeb3React } from "@web3-react/core";

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
}) {
  const web3 = new Web3(Web3.givenProvider);
  const { chainId } = useWeb3React();
  const contractAddress =
    chainId === 4
      ? CONTRACT_ADDRESS_CAPX_RINKEBY
      : chainId === 97
      ? CONTRACT_ADDRESS_CAPX_BSC
      : chainId === 80001
      ? CONTRACT_ADDRESS_CAPX_MATIC
      : null;
  const { t } = useTranslation();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [approveModalStatus, setApproveModalStatus] = useState("");
  const [tokenApproval, setTokenApproval] = useState(false);
  // const [approveModalOpen, setApproveModalOpen] = useState(true);
  // const [vestModalOpen, setVestModalOpen] = useState(false);
  const [vestModalStatus, setVestModalStatus] = useState("");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const vestingTokenContract = new web3.eth.Contract(
    CONTRACT_ABI_ERC20,
    contractDetails.contractAddress
  );
  const capxContract = new web3.eth.Contract(
    CONTRACT_ABI_CAPX,
    contractAddress
  );
  const TryApproveToken = async () => {
    setButtonClicked(true);
    const totalTokens = totalVested(vestingArray);
    await approveToken(
      vestingArray,
      tokenDetails,
      metamaskAccount,
      totalTokens,
      vestingTokenContract,
      capxContract,
      contractAddress,
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
      contractAddress,
      setButtonClicked,
      setVestModalOpen,
      setVestModalStatus,
      enqueueSnackbar,
      setStep
    );
    setButtonClicked(false);
  };
  return (
    <div className="pt-10">
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
      <p className="vesting_pages_title">{t("lock_vesting_sheet")}</p>

      <div
        className={`tablet:w-max  tablet:px-8 tablet:py-6 px-4 py-5 rounded-lg tablet:rounded-xl flex flex-row ring-1 bg-dark-300 ring-success-color-300`}
      >
        <div>
          <img
            alt="upload vesting sheet"
            src={LockIcon}
            className="w-6 tablet:w-6 desktop:w-8 mr-6 tablet: pt-1 "
          />
        </div>
        <div className="whitespace-normal desktop:text-paragraph-2 tablet:text-caption-1 text-caption-2 flex flex-col mr-5 mt-1">
          {uploadedFile.name}
        </div>

        <div className="hidden tablet:flex">
          <Level3CTA
            text={tokenApproval ? `${t("lock_token")}` : `${t("approve")}`}
            icon={true}
            disabled={buttonClicked}
            onClick={() => (tokenApproval ? TryLockToken() : TryApproveToken())}
          />
        </div>
      </div>

      <hr className="border-dark-200 mt-10 h-2"></hr>
      <div className="flex tablet:hidden mt-3">
        <Level3CTA
          text={tokenApproval ? `${t("lock_token")}` : `${t("approve")}`}
          icon={true}
          disabled={buttonClicked}
          onClick={() => (tokenApproval ? TryLockToken() : TryApproveToken())}
        />
      </div>
      <div className="flex flex-row mt-8">
        <div
          className={`tablet:w-max cursor-pointer tablet:px-8 tablet:py-6 px-4 py-1 text-success-color-300 rounded-xl flex flex-row bg-success-color-200 bg-opacity-10  `}
        >
          <div>
            <img
              alt="upload vesting sheet"
              src={InfoIcon}
              className="w-5 tablet:w-5 desktop:w-6 mr-6 tablet: pt-1 "
            />
          </div>
          <p className="whitespace-normal desktop:text-paragraph-2 tablet:text-caption-1 text-caption-2">
            You’re locking {totalVested(vestingArray)} tokens with{" "}
            {vestingArray.length}{" "}
            {vestingArray.length > 1 ? "addresses" : "address"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LockAndApprove;
