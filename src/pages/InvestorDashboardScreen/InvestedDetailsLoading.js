import "./InvestedProjectDetails.scss";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WalletModal from "../../components/Modal/WalletModal/WalletModal";

import Redirect from "../../assets/Redirect.svg";
import Lottie from "lottie-react";
import NextIconBlack from "../../assets/next-black.svg";
import SandTimer from "../../assets/SandTimer.json";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
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
const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");

function InvestedDetailsLoading() {
  return (
    <>
      <div className="investedprojectdetails_maincontainer_title_loading"></div>
      <div className="investedprojectdetails_maincontainer_innercontainer">
        <div className="investedprojectdetails_maincontainer_innercontainer_detailsection">
          <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv">
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_unlockcard p-20">
              <p className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_unlockcard_loading">
                -
              </p>
            </div>
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection">
              {[0, 1, 2].map(function () {
                return (
                  <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection_minidetailcard px-20">
                    <p className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection_minidetailcard_title">
                      <p className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection_minidetailcard_title_loading">
                        -
                      </p>
                    </p>
                    <p className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection_minidetailcard_value">
                      <p className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection_minidetailcard_value_loading">
                        -
                      </p>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv">
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_percentagecard">
              <div>Unlocked</div>
              <div className="w-full bg-gray-200 h-2 mt-6 rounded-md">
                <div
                  className="bg-gray-200 h-2 rounded-md"
                  style={{
                    width: "100%",
                  }}
                ></div>
              </div>
            </div>
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_percentagecard">
              Withdrawn
              <div className="w-full bg-gray-200 h-2 mt-6 rounded-md">
                <div
                  className="bg-gray-200 h-2 rounded-md"
                  style={{
                    width: "100%",
                  }}
                ></div>
              </div>
            </div>
            <p>NEXT PAYMENT IN</p>
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer">
              <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
                <div>0</div>
                <div>days</div>
              </div>
              <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
                <div>0</div>
                <div>hours</div>
              </div>
              <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
                <div>0</div>
                <div>min</div>
              </div>
              <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
                <div>0</div>
                <div>sec</div>
              </div>
            </div>
            <div className={"cursor-not-allowed"}>
              <Level3CTA text={"Withdraw"} fullWidth={true} disabled={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvestedDetailsLoading;
