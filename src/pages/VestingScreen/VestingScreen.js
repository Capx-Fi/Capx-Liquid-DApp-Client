import React, { useEffect, useState } from "react";

import "./VestingScreen.scss";

import CapxLogo from "../../assets/capxliquid-logo.svg";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import BackIcon from "../../assets/previous-cyan.png";
import UploadTemplate from "../../containers/VestingScreen/UploadTemplate";
import Review from "../../containers/VestingScreen/Review";
import Errors from "../../containers/VestingScreen/Errors";

import SuccessModal from "../../components/Modal/SuccessModal/SuccessModal";
import { useWeb3React } from "@web3-react/core";


import VestingSteps from "../../components/VestingSteps/VestingSteps";
import ProjectDetails2 from "../../components/VestingForm/ProjectDetails/ProjectDetails";
import WalletModal from "../../components/Modal/WalletModal/WalletModal"

import { useHistory } from "react-router";


function VestingScreen() {
  const { active, account, chainId } = useWeb3React();
  const [step, setStep] = useState(1);
  const [modalMode, setModalMode] = useState(0);
  const [showSteps, setShowSteps] = useState(true);
  useEffect(() => {
    setShowSteps(true);
    setStep(1);
  }, [account, chainId]);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [vestModalOpen, setVestModalOpen] = useState(false);
  const history = useHistory();

  if (step === 0) {
    history.push("/");
  }

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
        <WalletModal modalMode={modalMode} setModalMode={setModalMode}/>
      ) : showSteps ? (
        <VestingSteps setShowSteps={setShowSteps} />
      ) : step === 4 ? (
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
                step === 3 ? "vesting_container_table" : (step === 2 ? "upload_container" : "vesting_container")
              } `}
            >
              <div className="border-b-2 border-greyborder screen:pb-2 desktop:pb-4 flex justify-between screen:pt-2 desktop:pt-4 text-blizzard items-baseline screen:text-caption-2 screen:leading-caption-2 desktop:text-paragraph-2 desktop:leading-paragraph-2">
                <div
                  className={`flex flex-row cursor-pointer items-baseline ${
                    (step === -1) && "invisible"
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
                  className={` ${(step === -1 || step === 4) && "invisible"}`}
                >
                  {step}/3
                </div>
              </div>
              {step === 1 && (
                <ProjectDetails2
                  contractAddress={contractDetails.contractAddress}
                  setContractAddress={setContractAddress}
                  setStep={setStep}
                  tokenDetails={tokenDetails}
                  setTokenDetails={setTokenDetails}
                  projectExists={projectExists}
                  setProjectExists={setProjectExists}
                  metamaskAccount={account}
                  projectName={contractDetails.projectTitle}
                  projectDescription={contractDetails.projectDescription}
                  setProjectName={setProjectTitle}
                  setProjectDescription={setProjectDescription}
                  setContractDetails={setContractDetails}
                />
              )}
              {step === 2 && (
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
              {step === 3 && contractDetails.vestingArray.length > 0 && (
                <Review
                  setStep={setStep}
                  vestingArray={contractDetails.vestingArray}
                  setVestingDataSellable={setVestingDataSellable}
                  setVestingDataWrapped={setVestingDataWrapped}
                  tokenTicker={tokenDetails.ticker}
                  uploadedFile={contractDetails.uploadedFile}
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
          </div>
          <Footer vesting={true} />
        </div>
      )}
    </>
  );
}

export default VestingScreen;
