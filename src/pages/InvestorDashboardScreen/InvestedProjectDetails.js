import "./InvestedProjectDetails.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WalletModal from "../../components/Modal/WalletModal/WalletModal";

import Redirect from "../../assets/Redirect.svg";
import Lottie from "lottie-react";
import NextIconBlack from "../../assets/next-black.svg";
import SandTimer from "../../assets/SandTimer.json";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";
import Popup from "reactjs-popup";

import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import WithdrawModal from "../../components/Modal/VestAndApproveModal/WithdrawModal";
import { CONTRACT_ABI_ERC20 } from "../../contracts/SampleERC20";
import { withdrawWrappedTokens } from "../../utils/withdrawWrappedTokens";
import { CONTRACT_ABI_CAPX } from "../../contracts/CapxController";
import Web3 from "web3";

import NothingHereInvestorDashboard from "../NothingHere/NothingHereInvestorDashboard";
import { withdrawVestedTokens } from "../../utils/withdrawVestedTokens";
import InvestorLoading from "./InvestorLoading";
import { Tooltip, withStyles } from "@material-ui/core";
import { fetchAcalaInvestorDashboard } from "../../utils/acalaEVM/fetchInvestorDashboard";
import {
  getContractAddress,
  getContractAddressController,
  getExplorer,
  getGraphURL,
} from "../../constants/getChainConfig";
import { ACALA_CHAIN_ID } from "../../constants/config";
import useWagmi from "../../useWagmi";
import { fetchInvestorDashboard } from "../../utils/graphFetch/fetchInvestorDashboard";
import Level3CTA from "../../components/CTA/Level3CTA";
import InvestedDetailsLoading from "./InvestedDetailsLoading";
import Pagination from "../../components/Pagination";
import { useHistory, useLocation } from "react-router-dom";
import UnlockCard from "../../components/UnlockCard/UnlockCard";
const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");

function InvestedProjectDetails() {
  const [modalMode, setModalMode] = useState(0);
  const [ownedProjectsData, setOwnedProjectsData] = useState(null);
  const { active, account, chainId, connector, library, provider } = useWagmi();
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [withdrawModalStatus, setWithdrawModalStatus] = useState("");
  const [web3, setWeb3] = useState(null);

  const [showtype, setShowtype] = useState("UNLOCKED");
  useEffect(() => {
    active &&
      provider.then((res) => {
        setWeb3(new Web3(res));
      });
  }, [active, chainId]);

  // web3 && console.log(web3);
  const contractAddress = chainId && getContractAddress(chainId);

  const contractAddressController =
    chainId && getContractAddressController(chainId);

  const capxContract =
    web3 && new web3.eth.Contract(CONTRACT_ABI_CAPX, contractAddress);
  // console.dir(capxContract);

  // console.log(account);
  const graphURL = chainId && getGraphURL(chainId);

  const tryWithdraw = async (
    wrappedTokenAddress,
    tokenAmount,
    vestID,
    tokenDecimal
  ) => {
    setButtonDisabled(true);
    if (vestID) {
      await withdrawVestedTokens(
        wrappedTokenAddress,
        tokenAmount,
        account,
        capxContract,
        setButtonDisabled,
        setWithdrawModalOpen,
        setWithdrawModalStatus,
        enqueueSnackbar,
        contractAddress,
        vestID
      );
    } else {
      const wrappedTokenContract =
        web3 && new web3.eth.Contract(CONTRACT_ABI_ERC20, wrappedTokenAddress);
      await withdrawWrappedTokens(
        wrappedTokenAddress,
        tokenAmount,
        account,
        capxContract,
        setButtonDisabled,
        setWithdrawModalOpen,
        setWithdrawModalStatus,
        enqueueSnackbar,
        wrappedTokenContract,
        contractAddress,
        contractAddressController,
        tokenDecimal
      );
    }
    setButtonDisabled(false);
  };

  console.log(ownedProjectsData);
  const history = useHistory();
  const location = useLocation();
  const project = location?.state?.project;
  const projectOverview = location?.state?.projectOverview;

  const data = project?.details;

  const [currentpage, setCurrentpage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const indexOfLastItem = currentpage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    data.length > 0 ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber) => setCurrentpage(pageNumber);

  console.log(project, projectOverview, "investedDetail");
  if (!project || !projectOverview) {
    history.push("/investors");
  }
  //timer

  const Ref = useRef(null);
  const [timer, setTimer] = useState({
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 3600 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer({
        days: days,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      });
    }
  };

  const clearTimer = (e) => {
    setTimer({
      days: 0,
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 360000);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <>
      {!active ? (
        <WalletModal modalMode={modalMode} setModalMode={setModalMode} />
      ) : !project ? (
        <article className="investedprojectdetails">
          <Header hiddenSwitch={true} />
          <section className="investedprojectdetails_maincontainer">
            <InvestedDetailsLoading />;
          </section>
          <Footer />
        </article>
      ) : (
        <article
          style={{
            filter: withdrawModalOpen ? "blur(10000px)" : "none",
          }}
          className="investedprojectdetails"
        >
          <Header hiddenSwitch={true} />
          <section className="investedprojectdetails_maincontainer">
            <div className="investedprojectdetails_maincontainer_title">
              <svg
                onClick={() => history.push("/investor")}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 my-auto cursor-pointer hover:text-primary-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 my-auto opacity-50"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {projectOverview?.details?.projectName} (
              {projectOverview?.details?.projectTokenTicker})
            </div>
            <div className="investedprojectdetails_maincontainer_innercontainer">
              <WithdrawModal
                open={withdrawModalOpen}
                setOpen={setWithdrawModalOpen}
                withdrawModalStatus={withdrawModalStatus}
                setWithdrawModalStatus={setWithdrawModalStatus}
              />

              <div className="investedprojectdetails_maincontainer_innercontainer_detailsection">
                <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv">
                  <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_unlockcard">
                    <div className="w-full mx-auto">
                      <p className="font-light mb-10">{showtype}</p>
                      <p className="font-bold text-xl">
                        <span className="text-3xl">
                          {convertToInternationalCurrencySystem(
                            showtype === "UNLOCKED"
                              ? project?.unlockedTokens
                              : project?.withdrawnTokens
                          )}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        /
                        {convertToInternationalCurrencySystem(
                          project?.totalAllocatedTokens
                        )}{" "}
                        {projectOverview?.details?.projectTokenTicker}
                      </p>
                    </div>
                  </div>
                  <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection">
                    {currentItems.map(function (unlock) {
                      return (
                        <UnlockCard
                          unlock={unlock}
                          projectOverview={projectOverview}
                        />
                      );
                    })}
                  </div>
                  <div>
                    <Pagination
                      itemsPerPage={itemsPerPage}
                      currentPage={currentpage}
                      totalItems={data.length}
                      paginate={paginate}
                    />
                  </div>
                  <div className="mx-auto flex flex-row gap-x-4">
                    <Level3CTA
                      text={"History"}
                      svgIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white mr-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    />{" "}
                    <Level3CTA
                      text={"Schedule"}
                      svgIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-white mr-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      }
                    />
                  </div>
                </div>

                <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv">
                  <div
                    className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_percentagecard hover:bg-primary-green-100 cursor-pointe"
                    onMouseEnter={() => setShowtype("UNLOCKED")}
                  >
                    <div className="flex flex-row justify-between">
                      <div>Unlocked</div>
                      <div>
                        {Math.round(
                          project?.unlockedTokens /
                            project?.totalAllocatedTokens
                        ) * 100}
                        %
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 mt-2 rounded-md r">
                      <div
                        className="bg-primary-green-400 h-2 rounded-md"
                        style={{
                          width: `${
                            Math.round(
                              project?.unlockedTokens /
                                project?.totalAllocatedTokens
                            ) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div
                    className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_percentagecard hover:bg-primary-green-100 cursor-pointer"
                    onMouseLeave={() => setShowtype("UNLOCKED")}
                    onMouseEnter={() => setShowtype("WITHDRAWN")}
                  >
                    <div className="flex flex-row justify-between">
                      <div>Withdrawn</div>
                      <div>
                        {Math.round(
                          project?.withdrawnTokens /
                            project?.totalAllocatedTokens
                        ) * 100}
                        %
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 mt-2 rounded-md">
                      <div
                        className="bg-primary-green-400 h-2 rounded-md"
                        style={{
                          width: `${
                            Math.round(
                              project?.withdrawnTokens /
                                project?.totalAllocatedTokens
                            ) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <p className="font-light mt-5">NEXT PAYMENT IN</p>
                  <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer px-10 py-4">
                    <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
                      <div className="font-extrabold">{timer.days}</div>
                      <div className="font-normal">days</div>
                    </div>
                    <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
                      <div className="font-extrabold">{timer.hours}</div>
                      <div className="font-normal">hours</div>
                    </div>
                    <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
                      <div className="font-extrabold">{timer.minutes}</div>
                      <div className="font-normal">min</div>
                    </div>
                    <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
                      <div className="font-extrabold">{timer.seconds}</div>
                      <div className="font-normal">sec</div>
                    </div>
                  </div>
                  <div
                    className={
                      project?.withdrawAllowed ? "" : "cursor-not-allowed"
                    }
                  >
                    <Level3CTA
                      text={"Withdraw"}
                      fullWidth={true}
                      disabled={!project?.withdrawAllowed}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </article>
      )}
    </>
  );
}

export default InvestedProjectDetails;
