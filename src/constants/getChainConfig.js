import {
  ARBITRUM_CHAIN_ID,
  AVALANCHE_CHAIN_ID,
  BSC_CHAIN_ID,
  CONTRACT_ADDRESS_CAPX_ARBITRUM,
  CONTRACT_ADDRESS_CAPX_AVALANCHE,
  CONTRACT_ADDRESS_CAPX_BSC,
  CONTRACT_ADDRESS_CAPX_CONTROLLER_ARBITRUM,
  CONTRACT_ADDRESS_CAPX_CONTROLLER_AVALANCHE,
  CONTRACT_ADDRESS_CAPX_CONTROLLER_BSC,
  CONTRACT_ADDRESS_CAPX_CONTROLLER_ETHEREUM,
  CONTRACT_ADDRESS_CAPX_CONTROLLER_FANTOM,
  CONTRACT_ADDRESS_CAPX_CONTROLLER_MATIC,
  CONTRACT_ADDRESS_CAPX_CONTROLLER_MOONBEAM,
  CONTRACT_ADDRESS_CAPX_ETHEREUM,
  CONTRACT_ADDRESS_CAPX_FANTOM,
  CONTRACT_ADDRESS_CAPX_MATIC,
  CONTRACT_ADDRESS_CAPX_MOONBEAM,
  ETHEREUM_CHAIN_ID,
  EXPLORER_ARBITRUM,
  EXPLORER_AVALANCHE,
  EXPLORER_BSC,
  EXPLORER_ETHEREUM,
  EXPLORER_FANTOM,
  EXPLORER_MATIC,
  EXPLORER_MOONBEAM,
  FANTOM_CHAIN_ID,
  GRAPHAPIURL_AVALANCHE,
  GRAPHAPIURL_BSC,
  GRAPHAPIURL_ETHEREUM,
  GRAPHAPIURL_FANTOM,
  GRAPHAPIURL_MATIC,
  MATIC_CHAIN_ID,
  MOONBEAM_CHAIN_ID,
  MANDALA_CHAIN_ID,
  EXPLORER_MANDALA,
  CONTRACT_ADDRESS_CAPX_MANDALA,
  CONTRACT_ADDRESS_CAPX_CONTROLLER_MANDALA,
  GRAPHAPIURL_MANDALA,
} from "./config";

export const getContractAddress = (chainId) => {
	const contractAddress =
		chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_ETHEREUM
			: chainId?.toString() === MATIC_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_MATIC
			: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_AVALANCHE
			: chainId?.toString() === FANTOM_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_FANTOM
			: chainId?.toString() === MOONBEAM_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_MOONBEAM
			: chainId?.toString() === ARBITRUM_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_ARBITRUM
			: chainId?.toString() === MANDALA_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_MANDALA
			: CONTRACT_ADDRESS_CAPX_BSC;
	return contractAddress;
};

export const getContractAddressController = (chainId) => {
	const contractAddressController =
		chainId?.toString() === BSC_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_CONTROLLER_BSC
			: chainId?.toString() === MATIC_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_CONTROLLER_MATIC
			: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_CONTROLLER_AVALANCHE
			: chainId?.toString() === FANTOM_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_CONTROLLER_FANTOM
			: chainId?.toString() === MOONBEAM_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_CONTROLLER_MOONBEAM
			: chainId?.toString() === ARBITRUM_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_CONTROLLER_ARBITRUM
			: chainId?.toString() === MANDALA_CHAIN_ID?.toString()
			? CONTRACT_ADDRESS_CAPX_CONTROLLER_MANDALA
			: CONTRACT_ADDRESS_CAPX_CONTROLLER_ETHEREUM;
	return contractAddressController;
};

export const getExplorer = (chainId) => {
	const explorer =
		chainId?.toString() === ETHEREUM_CHAIN_ID?.toString()
			? EXPLORER_ETHEREUM
			: chainId?.toString() === MATIC_CHAIN_ID?.toString()
			? EXPLORER_MATIC
			: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
			? EXPLORER_AVALANCHE
			: chainId?.toString() === FANTOM_CHAIN_ID?.toString()
			? EXPLORER_FANTOM
			: chainId?.toString() === MOONBEAM_CHAIN_ID?.toString()
			? EXPLORER_MOONBEAM
			: chainId?.toString() === ARBITRUM_CHAIN_ID?.toString()
			? EXPLORER_ARBITRUM
			: chainId?.toString() === MANDALA_CHAIN_ID?.toString()
			? EXPLORER_MANDALA
			: EXPLORER_BSC;
	return explorer;
};

export const getGraphURL = (chainId) => {
  const graphURL =
    chainId?.toString() === BSC_CHAIN_ID?.toString()
      ? GRAPHAPIURL_BSC
      : chainId?.toString() === MATIC_CHAIN_ID?.toString()
      ? GRAPHAPIURL_MATIC
      : chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
      ? GRAPHAPIURL_AVALANCHE
      : chainId?.toString() === FANTOM_CHAIN_ID?.toString()
      ? GRAPHAPIURL_FANTOM
      : chainId?.toString() === MANDALA_CHAIN_ID?.toString()
      ? GRAPHAPIURL_MANDALA
      : GRAPHAPIURL_ETHEREUM;
  return graphURL;
};

export const getSortBy = (chainId) => {
	const sortBy =
		chainId?.toString() === BSC_CHAIN_ID?.toString()
			? "BSC"
			: chainId?.toString() === MATIC_CHAIN_ID?.toString()
			? "Matic"
			: chainId?.toString() === AVALANCHE_CHAIN_ID?.toString()
			? "Avalanche"
			: chainId?.toString() === FANTOM_CHAIN_ID?.toString()
			? "Fantom"
			: chainId?.toString() === MOONBEAM_CHAIN_ID?.toString()
			? "Moonbeam"
			: chainId?.toString() === ARBITRUM_CHAIN_ID?.toString()
			? "Arbitrum"
			: chainId?.toString() === MANDALA_CHAIN_ID?.toString()
			? "Karura"
			: "Ethereum";
	return sortBy;
};
