import "./Header.scss";
import CapxLogo from "../../assets/capxliquid-logo.svg";
import LogoutIcon from "../../assets/logout.svg";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { useMetamask } from "../../metamaskReactHook/index";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../../utils/connector";
import ChooseDashboardModal from "../Modal/ChooseDashboardModal/ChooseDashboardModal";
import DropDown from "../DropDown/DropDown";
import { Tooltip, withStyles } from "@material-ui/core";

import { useEffect, useState } from "react";
import { CHAIN_NAMES } from "../../constants/config";

import { getSortBy } from "../../constants/getChainConfig";

function Header({ vesting, hiddenNav, showSteps, hiddenSwitch }) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();
	const { metaState, getChain } = useMetamask();
	const desiredChainId = "4";
	const currentChainId = metaState.chain.id?.toString();
	const [dashboardModal, setDashboardModal] = useState(false);
	const [sortBy, setSortBy] = useState("Ethereum");
	const web3 = new Web3(Web3.givenProvider);
	const handleCloseSelectDashboard = () => {
		setDashboardModal(false);
	};

	useEffect(() => {
		setSortBy(chainId && getSortBy(chainId));
	}, [chainId]);

	async function connect() {
		try {
			await activate(injected);
		} catch (ex) {
			if (ex instanceof UnsupportedChainIdError) {
				enqueueSnackbar(`Please connect to the ${CHAIN_NAMES} Mainnet Chain.`, {
					variant: "error",
				});
			}
		}
	}

	const chainChange = async (chainName) => {
		if (chainName === "Ethereum") {
			try {
				await web3.currentProvider.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x4" }],
				});
			} catch (error) {}
		} else if (chainName === "Matic") {
			try {
				await web3.currentProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x13881",
							chainName: "Polygon Testnet",
							nativeCurrency: {
								name: "MATIC",
								symbol: "MATIC",
								decimals: 18,
							},
							rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
							blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "BSC") {
			try {
				await web3.currentProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x61",
							chainName: "Binance Smart Chain Test",
							nativeCurrency: {
								name: "BNB",
								symbol: "BNB",
								decimals: 18,
							},
							rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
							blockExplorerUrls: ["https://testnet.bscscan.com/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "Avalanche") {
			try {
				await web3.currentProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0xA869",
							chainName: "Avalanche Fuji",
							nativeCurrency: {
								name: "AVAX",
								symbol: "AVAX",
								decimals: 18,
							},
							rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
							blockExplorerUrls: ["https://testnet.snowtrace.io/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "Fantom") {
			try {
				await web3.currentProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0xFA",
							chainName: "Fantom",
							nativeCurrency: {
								name: "FTM",
								symbol: "FTM",
								decimals: 18,
							},
							rpcUrls: ["https://rpc3.fantom.network	"],
							blockExplorerUrls: ["https://testnet.ftmscan.com/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "Moonbeam") {
			try {
				await web3.currentProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x504",
							chainName: "Moonbeam",
							nativeCurrency: {
								name: "GLMR",
								symbol: "GLMR",
								decimals: 18,
							},
							rpcUrls: ["https://rpc.api.moonbeam.network"],
							blockExplorerUrls: ["https://moonscan.io/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "Arbitrum") {
			try {
				await web3.currentProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0xA4B1",
							chainName: "Arbitrum",
							nativeCurrency: {
								name: "ETH",
								symbol: "ETH",
								decimals: 18,
							},
							rpcUrls: ["https://rpc.ankr.com/arbitrum"],
							blockExplorerUrls: ["https://testnet.arbiscan.io/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		}
	};

	async function disconnect() {
		try {
			deactivate();
		} catch (ex) {
			console.log(ex);
		}
	}

	console.log(chainId);
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
	return (
		<>
			<ChooseDashboardModal
				dashboardModal={dashboardModal}
				handleCloseSelectDashboard={handleCloseSelectDashboard}
			/>
			<header
				className={`header z-20 ${
					vesting
						? "border-b border-dark-200 tablet:border-none"
						: "border-b border-dark-200 "
				}`}
			>
				<a href="/">
					<div>
						<img
							className={`header_logo ${vesting && "flex tablet:hidden "}`}
							src={CapxLogo}
							alt="capx logo"
						/>
					</div>
				</a>
				{!hiddenNav && (
					<div className="header_navbar">
						{!vesting && (
							<>
								{" "}
								<div
									className={`header_navbar_text ${
										hiddenSwitch ? "hidden tablet:flex" : ""
									}`}
									onClick={() => {
										setDashboardModal(true);
									}}
								>
									Switch Dashboard
								</div>
								<div
									className={`header_navbar_gap ${
										hiddenSwitch ? "hidden tablet:flex" : ""
									}`}
								></div>
							</>
						)}
						{active ? (
							<>
								<div className="mr-4">
									{connector === "WalletConnectConnector" ? (
										<DropDown sortBy={sortBy} chainChange={chainChange} />
									) : (
										<HtmlTooltip
											arrow
											placement="bottom"
											title={
												<>
													<span className="flex justify-between items-center">
														{`Please change the chain on MetaMask Mobile`}
													</span>
												</>
											}
										>
											<div className="bg-dark-200 w-30 rounded-md p-2 cursor-pointer">
												{sortBy === "matic" ? "Matic" : sortBy}
											</div>
										</HtmlTooltip>
									)}
								</div>
								<div className="header_navbar_logoutbutton">
									<div className="header_navbar_logoutbutton_text">
										{" "}
										{`${account.substr(0, 6)}...${account.substr(-4)}`}
									</div>
									<img
										className="header_navbar_logoutbutton_icon"
										onClick={disconnect}
										src={LogoutIcon}
										alt="logout icon"
									/>
								</div>
							</>
						) : (
							<div className="header_navbar_button">
								<div onClick={connect} className="header_navbar_button_text">
									Connect Wallet
								</div>
							</div>
						)}
					</div>
				)}{" "}
			</header>
		</>
	);
}

export default Header;
