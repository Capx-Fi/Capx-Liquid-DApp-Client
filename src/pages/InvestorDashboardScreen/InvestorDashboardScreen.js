import "./InvestorDashboardScreen.scss";

import NextIcon from "../../assets/next.svg";
import CapxCoinIllustration from "../../assets/CapxCoinIllustration.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import WalletModal from "../../components/Modal/WalletModal/WalletModal";

import OwnedProjectToken from "../../assets/OwnedProjectToken.svg";
import Redirect from "../../assets/Redirect.svg";
import Lottie from "lottie-react";
import NextIconBlack from "../../assets/next-black.svg";
import SandTimer from "../../assets/SandTimer.json";
import MetamaskModal from "../../components/Modal/MetamaskModal/MetamaskModal";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { fetchOwnedTokens } from "../../utils/fetchOwnedTokens";
import WithdrawModal from "../../components/Modal/VestAndApproveModal/WithdrawModal";
import { CONTRACT_ABI_ERC20 } from "../../contracts/SampleERC20";
import { withdrawWrappedTokens } from "../../utils/withdrawWrappedTokens";
import { CONTRACT_ABI_CAPX } from "../../contracts/CapxController";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import NothingHereInvestorDashboard from "../NothingHere/NothingHereInvestorDashboard";
import LoadingScreen from "../../containers/LoadingScreen";
import { fetchWrappedInvestorID } from "../../utils/fetchWrappedInvestorID";
import { fetchVestedInvestorID } from "../../utils/fetchVestedInvestorID";
import { fetchProjectDetails } from "../../utils/fetchProjectDetails";
import { fetchVestedProjectDetails } from "../../utils/fetchVestedProjectDetails";
import { fetchWrappedProjectDetails } from "../../utils/fetchWrappedProjectDetails";
import { transformInvestorData } from "../../utils/transformInvestorData";
import { withdrawVestedTokens } from "../../utils/withdrawVestedTokens";
import InvestorLoading from "./InvestorLoading";
import { Tooltip, withStyles } from "@material-ui/core";
import {
	getContractAddress,
	getContractAddressController,
	getExplorer,
	getMasterURL,
	getVestingURL,
	getWrappedURL,
} from "../../constants/getChainConfig";
import { useMetamask } from "../../metamaskReactHook";
const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");

function InvestorDashboardScreen() {
	const [modalMode, setModalMode] = useState(0);
	const [ownedProjectsData, setOwnedProjectsData] = useState(null);
	const [projectOverviewData, setProjectOverviewData] = useState(null);
	const [wrappedProjectData, setWrappedProjectData] = useState([]);
	const [vestedProjectData, setVestedProjectData] = useState([]);
	const { active, account, chainId, connector } = useWeb3React();
	const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [withdrawModalStatus, setWithdrawModalStatus] = useState("");

	let provider = null;
	console.log(connector?.constructor?.name);
	if (connector?.constructor?.name === "InjectedConnector") {
		provider = window.ethereum;
	} else {
		provider = new WalletConnectProvider({
			rpc: {
				80001: "https://matic-mumbai.chainstacklabs.com",
				97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
				4: "https://rinkeby.infura.io/web3/",
				43113: "https://api.avax-test.network/ext/bc/C/rpc",
				4002: "https://rpc3.fantom.network",
			},
		});
	}
	// console.log(new Web3(Web3.givenProvider));

	const web3 = new Web3(Web3.givenProvider || provider);
	console.log(web3);
	const contractAddress = chainId && getContractAddress(chainId);

	const contractAddressController =
		chainId && getContractAddressController(chainId);

	const capxContract = new web3.eth.Contract(
		CONTRACT_ABI_CAPX,
		contractAddress
	);
	console.dir(capxContract);
	const explorer = chainId && getExplorer(chainId);

	function onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}
	useEffect(() => {
		// fetchOwnedTokens(account, setOwnedProjectsData, GRAPHAPIURL);
		loadProjectData();
	}, [account, chainId]);
	const HtmlTooltip = withStyles((theme) => ({
		tooltip: {
			background: "#2A383C",
			color: "#F1FAF2",
			maxWidth: 800,
			fontSize: theme.typography.pxToRem(12),
			borderRadius: "4px",
			zIndex: 100,
		},
	}))(Tooltip);

	const vestingURL = chainId && getVestingURL(chainId);

	const wrappedURL = chainId && getWrappedURL(chainId);

	// console.log(account);
	const masterURL = chainId && getMasterURL(chainId);
	const loadProjectData = async () => {
		setOwnedProjectsData(null);
		if (account) {
			const vInvestorIDs = await fetchVestedInvestorID(account, vestingURL);

			const wInvestorIDs = await fetchWrappedInvestorID(account, wrappedURL);
			const showIDs = [...wInvestorIDs, ...vInvestorIDs]
				.filter(onlyUnique)
				.sort();
			const projectOwnerDetails = await fetchProjectDetails(showIDs, masterURL);
			const vestedProjectDetails = await fetchVestedProjectDetails(
				showIDs,
				vestingURL
			);
			const wrappedProjectDetails = await fetchWrappedProjectDetails(
				showIDs,
				wrappedURL
			);
			if (projectOwnerDetails !== null) {
				setProjectOverviewData(projectOwnerDetails.data.projects);
				setWrappedProjectData(wrappedProjectDetails.data.projects);
				setVestedProjectData(vestedProjectDetails.data.projects);
				let projects = await transformInvestorData(
					account,
					projectOwnerDetails.data.projects,
					wrappedProjectDetails.data.projects,
					vestedProjectDetails.data.projects
				);
				setOwnedProjectsData(projects);
			}
		}
	};
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
			const wrappedTokenContract = new web3.eth.Contract(
				CONTRACT_ABI_ERC20,
				wrappedTokenAddress
			);
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
		setTimeout(() => {
			loadProjectData();
		}, 6000);
	};
	return (
		<>
			{!active ? (
				<WalletModal modalMode={modalMode} setModalMode={setModalMode} />
			) : !ownedProjectsData ? (
				<article className="investordashboardscreen">
					<Header hiddenSwitch={true} />
					<section className="investordashboardscreen_maincontainer">
						<div className="investordashboardscreen_maincontainer_title">
							INVESTOR DASHBOARD
						</div>
						<div className="investordashboardscreen_maincontainer_innercontainer">
							{[0, 1, 2]?.map((project) => {
								return <InvestorLoading />;
							})}
						</div>
					</section>
					<Footer />
				</article>
			) : ownedProjectsData.length === 0 ? (
				<NothingHereInvestorDashboard />
			) : (
				<article
					style={{
						filter: withdrawModalOpen ? "blur(10000px)" : "none",
					}}
					className="investordashboardscreen"
				>
					<Header hiddenSwitch={true} />
					<section className="investordashboardscreen_maincontainer">
						<div className="investordashboardscreen_maincontainer_title">
							INVESTOR DASHBOARD
						</div>
						<div className="investordashboardscreen_maincontainer_innercontainer">
							<WithdrawModal
								open={withdrawModalOpen}
								setOpen={setWithdrawModalOpen}
								withdrawModalStatus={withdrawModalStatus}
								setWithdrawModalStatus={setWithdrawModalStatus}
							/>
							{ownedProjectsData?.map((project) => {
								return (
									<div
										key={`${project.derivativeID}+${project.holderAddress}`}
										className="investordashboardscreen_maincontainer_innercontainer_projectcontainer"
									>
										<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_leftcontainer">
											<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox">
												<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_key">
													PROJECT NAME
												</div>
												<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_value">
													{project.projectName}
												</div>
											</div>
											<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox">
												<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_key">
													ALLOCATED ASSETS
												</div>
												<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_value">
													{convertToInternationalCurrencySystem(
														project.numOfTokens
													)}
												</div>
											</div>
											<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox">
												<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_key">
													UNLOCK DATE
												</div>
												<HtmlTooltip
													arrow
													placement="right-start"
													title={
														<React.Fragment className="flex justify-between">
															<span className="flex justify-between items-center font-bold pr-2">
																<Lottie
																	className="w-8 mr-1"
																	animationData={SandTimer}
																/>
																{Math.floor(
																	(Date.parse(project.date) -
																		Date.parse(datetime)) /
																		86400000
																) > 0
																	? `${Math.floor(
																			(Date.parse(project.date) -
																				Date.parse(datetime)) /
																				86400000
																	  )} days to unlock`
																	: Math.floor(
																			(Date.parse(project.date) -
																				Date.parse(datetime)) /
																				3600000
																	  ) >= 0
																	? `${Math.floor(
																			(Date.parse(project.date) -
																				Date.parse(datetime)) /
																				3600000
																	  )} hours to unlock`
																	: "Unlocked!"}
															</span>
														</React.Fragment>
													}
												>
													<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_value w-fit-content h-fit-content">
														{project.displayDate}
													</div>
												</HtmlTooltip>
											</div>
											<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_buttoncontainer">
												{project.vestID ? null : (
													<a
														href={`${explorer}${project.derivativeID}?a=${project.holderAddress}`}
														target="_blank"
														rel="noreferrer"
													>
														<HtmlTooltip
															arrow
															placement="bottom"
															title={
																<React.Fragment>
																	<span className="flex justify-between items-center">
																		{project.wrappedTokenTicker}
																	</span>
																</React.Fragment>
															}
														>
															<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_button">
																<div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_button_text">
																	{project.wrappedTokenTicker.split(".")[0]}
																	{project.wrappedTokenTicker
																		.split(".")[1]
																		?.split("-")[1]
																		? `-${
																				project.wrappedTokenTicker
																					.split(".")[1]
																					?.split("-")[1]
																		  }`
																		: ""}
																</div>

																<img
																	className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_button_icon"
																	src={Redirect}
																	alt="redirect icon"
																/>
															</div>
														</HtmlTooltip>
													</a>
												)}

												<div
													onClick={() => {
														tryWithdraw(
															project.derivativeID,
															project.tokenAmount,
															project.vestID,
															project.projectTokenDecimal
														);
													}}
													className={`investordashboardscreen_maincontainer_innercontainer_projectcontainer_withdrawbutton 
                          ${
														project.withdrawAllowed
															? "cursor-pointer"
															: "pointer-events-none opacity-50 z-10"
													} 
                          `}
												>
													<div
														className={`investordashboardscreen_maincontainer_innercontainer_projectcontainer_withdrawbutton_text`}
													>
														Withdraw
													</div>
													<img
														className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_withdrawbutton_icon"
														src={NextIconBlack}
														alt="arrow icon"
													/>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</section>
					<Footer />
				</article>
			)}
		</>
	);
}

export default InvestorDashboardScreen;
