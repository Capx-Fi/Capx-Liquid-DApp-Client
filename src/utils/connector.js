import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
	supportedChainIds: process.env.REACT_APP_SUPPORTED_CHAIN_IDS.replace(
		/['"]+/g,
		""
	)
		.split(", ")
		.map(Number),
});

export const walletconnect = new WalletConnectConnector({
	qrcode: true,
});
