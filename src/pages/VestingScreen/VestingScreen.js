import React, { useEffect, useState } from "react";
import ContractAddress from "../../containers/VestingScreen/ContractAddress";
import ProjectDetails from "../../containers/VestingScreen/ProjectDetails";
import "./VestingScreen.scss";

import CapxLogo from "../../assets/capxliquid-logo.svg";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import BackIcon from "../../assets/previous-cyan.png";
import DownloadTemplate from "../../containers/VestingScreen/DownloadTemplate";
import UploadTemplate from "../../containers/VestingScreen/UploadTemplate";
import Review from "../../containers/VestingScreen/Review";
import Errors from "../../containers/VestingScreen/Errors";
import LockAndApprove from "../../containers/VestingScreen/LockAndApprove";
import VestingOverview from "../../components/Modal/VestingOverview/VestingOverview";


import SuccessModal from "../../components/Modal/SuccessModal/SuccessModal";
import { useWeb3React } from "@web3-react/core";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import { useHistory } from "react-router";

import VestingSteps from "../../components/VestingSteps/VestingSteps";

function VestingScreen() {
  const { active, account, chainId } = useWeb3React();
  const [step, setStep] = useState(1);
  const [showSteps, setShowSteps] = useState(true);
  useEffect(() => {
    setShowSteps(true);
    setStep(1);
  }, [account, chainId]);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [vestModalOpen, setVestModalOpen] = useState(false);
  const history = useHistory();

  const [contractDetails, setContractDetails] = useState({
    contractAddress: null,
    projectTitle: "",
    projectDescription: "",
    uploadedFile: null,
    vestingArray: [],
    error: null,
  });
  const [tokenDetails, setTokenDetails] = useState({
    ticker: "",
    decimal: null,
    valid: false,
  });
  const [projectExists, setProjectExists] = useState({
    name: "",
    description: null,
    exists: false,
  });

  const setContractAddress = (addr) => {
    setContractDetails({
      ...contractDetails,
      contractAddress: addr,
      projectTitle: "",
      projectDescription: "",
    });
  };

  const setProjectTitle = (name) => {
    setContractDetails({ ...contractDetails, projectTitle: name });
  };

  const setProjectDescription = (desc) => {
    setContractDetails({ ...contractDetails, projectDescription: desc });
  };

  const setVestingData = (data, name) => {
    setContractDetails({
      ...contractDetails,
      vestingArray: data,
      uploadedFile: name,
      error: null,
    });
  };
  const setVestingDataSellable = (data) => {
    setContractDetails({
      ...contractDetails,
      vestingArray: data,
      error: null,
    });
  };

  const setVestingDataWrapped = (data) => {
    setContractDetails({
      ...contractDetails,
      vestingArray: data,
      error: null,
    });
  };

  const setUploadErrors = (data, file) => {
    setContractDetails({
      ...contractDetails,
      error: data,
      vestingArray: [],
      uploadedFile: file,
    });
  };

  const setUploadedFile = (data) => {
    setContractDetails({ ...contractDetails, uploadedFile: data });
  };

  const resetUploadedFile = (data) => {
    setContractDetails({ ...contractDetails, uploadedFile: null });
  };

  return (
    <>
      {!active ? (
        <MetamaskModal />
      ) : showSteps ? (
        <VestingSteps/>
      ) : step === 7 ? (
        <SuccessModal />
      ) : (
        <div
          className="flex flex-wrap h-screen"
          style={{
            filter:
              approveModalOpen || vestModalOpen ? "blur(10000px)" : "none",
          }}
        >
          <Header vesting={true} showSteps={showSteps} />
          <div className="left_div bg-vesting ">
            <div className="mx-auto z-50" onClick={() => history.push("/")}>
              <img
                className="cursor-pointer hidden mx-auto mt-5 tablet:flex h-8 laptop:h-10"
                onClick={() => history.push("/")}
                src={CapxLogo}
                alt="capx logo"
              />
            </div>
          </div>
          <div className="left_div_psuedo"></div>
          <div className="md:w-77p w-screen bg-dark-400">
            <div
              className={` ${
                step === 5 ? "vesting_container_table" : "vesting_container"
              } `}
            >
              <div className="flex justify-between pt-4 text-blizzard items-baseline text-caption-3 leading-caption-3 laptop:text-paragraph-2 laptop:leading-paragraph-2">
                <div
                  className={`flex flex-row cursor-pointer items-baseline ${
                    (step === 1 || step === -1) && "invisible"
                  }`}
                  onClick={() => setStep(step - 1)}
                >
                  <div>
                    <img
                      className="w-3 mr-3 mt-2"
                      src={BackIcon}
                      alt="next icon"
                    />
                  </div>
                  <div>Back</div>
                </div>
                <div
                  className={` ${(step === -1 || step === 7) && "invisible"}`}
                >
                  {step}/6
                </div>
              </div>
              {step === 1 && (
                <ContractAddress
                  contractAddress={contractDetails.contractAddress}
                  setContractAddress={setContractAddress}
                  setStep={setStep}
                  tokenDetails={tokenDetails}
                  setTokenDetails={setTokenDetails}
                  projectExists={projectExists}
                  setProjectExists={setProjectExists}
                  metamaskAccount={account}
                  setProjectName={setProjectTitle}
                  setProjectDescription={setProjectDescription}
                />
              )}
              {step === 2 && (
                <ProjectDetails
                  projectName={contractDetails.projectTitle}
                  projectDescription={contractDetails.projectDescription}
                  setProjectName={setProjectTitle}
                  setProjectDescription={setProjectDescription}
                  projectExists={projectExists}
                  setStep={setStep}
                  setContractDetails={setContractDetails}
                />
              )}
              {step === 3 && <DownloadTemplate setStep={setStep} />}
              {step === 4 && (
                <UploadTemplate
                  vestingArray={contractDetails.vestingArray}
                  error={contractDetails.error}
                  setStep={setStep}
                  uploadedFile={contractDetails.uploadedFile}
                  setVestingData={setVestingData}
                  setUploadErrors={setUploadErrors}
                  setUploadedFile={setUploadedFile}
                  tokenDetails={tokenDetails}
                />
              )}
              {step === 5 && contractDetails.vestingArray.length > 0 && (
                <Review
                  vestingArray={contractDetails.vestingArray}
                  setVestingDataSellable={setVestingDataSellable}
                  setVestingDataWrapped={setVestingDataWrapped}
                  setStep={setStep}
                  tokenTicker={tokenDetails.ticker}
                />
              )}
              {step === 6 && (
                <LockAndApprove
                  setStep={setStep}
                  uploadedFile={contractDetails.uploadedFile}
                  vestingArray={contractDetails.vestingArray}
                  tokenDetails={tokenDetails}
                  contractDetails={contractDetails}
                  metamaskAccount={account}
                  projectExists={projectExists}
                  approveModalOpen={approveModalOpen}
                  setApproveModalOpen={setApproveModalOpen}
                  vestModalOpen={vestModalOpen}
                  setVestModalOpen={setVestModalOpen}
                />
              )}
              {step === -1 && contractDetails.error && (
                <Errors
                  error={contractDetails.error}
                  setStep={setStep}
                  resetUploadData={resetUploadedFile}
                />
              )}
            </div>
            <Footer vesting={true} />
          </div>
        </div>
      )}
    </>
  );
}

export default VestingScreen;
