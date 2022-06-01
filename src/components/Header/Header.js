import "./Header.scss";
import CapxLogo from "../../assets/capxliquid-logo.svg";
import LogoutIcon from "../../assets/logout.svg";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { useMetamask } from "../../metamaskReactHook/index";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected, walletconnect } from "../../utils/connector";
import ChooseDashboardModal from "../Modal/ChooseDashboardModal/ChooseDashboardModal";
import DropDown from "../DropDown/DropDown";
import { Tooltip, withStyles } from "@material-ui/core";

import { useEffect, useState } from "react";
import { CHAIN_NAMES } from "../../constants/config";

import { getSortBy } from "../../constants/getChainConfig";

function Header({
	vesting,
	hiddenNav,
	showSteps,
	hiddenSwitch,
	isWalletConnect,
}) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { active, account, library, connector, activate, deactivate, chainId } =
		useWeb3React();
	const { metaState, getChain } = useMetamask();
	const desiredChainId = "4";
	const currentChainId = metaState.chain.id?.toString();
	const [dashboardModal, setDashboardModal] = useState(false);
	const [sortBy, setSortBy] = useState("Ethereum");
	const handleCloseSelectDashboard = () => {
		setDashboardModal(false);
	};

	console.log(isWalletConnect);
	let provider = walletconnect;

	// if (isWalletConnect) {
	// 	try {
	// 		provider = new WalletConnectProvider.default({
	// 			rpc: {
	// 				4: "https://rinkeby.infura.io/v3/031c5bdd74a54257994e2444875c5968", // https://ethereumnodes.com/
	// 				// ...
	// 			},
	// 			qrcodeModalOptions: {
	// 				mobileLinks: ["metamask"],
	// 			},
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// }
	console.log(provider);
	const web3 = new Web3(provider);
	console.log(web3);

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
				await web3.givenProvider.request({
					method: "wallet_switchEthereumChain",
					params: [{ chainId: "0x4" }],
				});
			} catch (error) {}
		} else if (chainName === "Matic") {
			try {
				await web3.givenProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x13881",
							chainName: "Polygon Matic",
							nativeCurrency: {
								name: "MATIC",
								symbol: "MATIC",
								decimals: 18,
							},
							rpcUrls: ["https://polygon-rpc.com/"],
							blockExplorerUrls: ["https://polygonscan.com/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "BSC") {
			try {
				await web3.givenProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0x61",
							chainName: "Binance Smart Chain",
							nativeCurrency: {
								name: "BNB",
								symbol: "BNB",
								decimals: 18,
							},
							rpcUrls: ["https://bsc-dataseed.binance.org/"],
							blockExplorerUrls: ["https://bscscan.com/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "Avalanche") {
			try {
				await web3.givenProvider.request({
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
							rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
							blockExplorerUrls: ["https://snowtrace.io/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "Fantom") {
			try {
				await web3.givenProvider.request({
					method: "wallet_addEthereumChain",
					params: [
						{
							chainId: "0xFA2",
							chainName: "Fantom",
							nativeCurrency: {
								name: "FTM",
								symbol: "FTM",
								decimals: 18,
							},
							rpcUrls: ["https://rpc.ftm.tools/"],
							blockExplorerUrls: ["https://ftmscan.com/"],
						},
					],
				});
			} catch (error) {
				console.error(error);
			}
		} else if (chainName === "Moonbeam") {
			try {
				await web3.givenProvider.request({
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
				await web3.givenProvider.request({
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
							className={`header_logo ${vesting && "flex screen:hidden "}`}
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
								<div className="mr-4 phone:hidden screen:block">
									<DropDown sortBy={sortBy} chainChange={chainChange} />
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
