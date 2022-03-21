import {
  AVALANCHE_CHAIN_ID,
  BSC_CHAIN_ID,
  CONTRACT_ADDRESS_CAPX_AVALANCHE,
  CONTRACT_ADDRESS_CAPX_BSC,
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
  EXPLORER_AVALANCHE,
  EXPLORER_BSC,
  EXPLORER_ETHEREUM,
  EXPLORER_FANTOM,
  EXPLORER_MATIC,
  EXPLORER_MOONBEAM,
  FANTOM_CHAIN_ID,
  GRAPHAPIURL_MASTER_AVALANCHE,
  GRAPHAPIURL_MASTER_BSC,
  GRAPHAPIURL_MASTER_ETHEREUM,
  GRAPHAPIURL_MASTER_FANTOM,
  GRAPHAPIURL_MASTER_MATIC,
  GRAPHAPIURL_MASTER_MOONBEAM,
  GRAPHAPIURL_VESTING_AVALANCHE,
  GRAPHAPIURL_VESTING_BSC,
  GRAPHAPIURL_VESTING_ETHEREUM,
  GRAPHAPIURL_VESTING_FANTOM,
  GRAPHAPIURL_VESTING_MATIC,
  GRAPHAPIURL_VESTING_MOONBEAM,
  GRAPHAPIURL_WRAPPED_AVALANCHE,
  GRAPHAPIURL_WRAPPED_BSC,
  GRAPHAPIURL_WRAPPED_ETHEREUM,
  GRAPHAPIURL_WRAPPED_FANTOM,
  GRAPHAPIURL_WRAPPED_MATIC,
  GRAPHAPIURL_WRAPPED_MOONBEAM,
  MATIC_CHAIN_ID,
  MOONBEAM_CHAIN_ID,
} from "./config";

export const getContractAddress = (chainId) => {
  const contractAddress =
    chainId?.toString() === ETHEREUM_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_ETHEREUM
      : chainId?.toString() === MATIC_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_MATIC
      : chainId?.toString() === AVALANCHE_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_AVALANCHE
      : chainId?.toString() === FANTOM_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_FANTOM
      : chainId?.toString() === MOONBEAM_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_MOONBEAM
      : CONTRACT_ADDRESS_CAPX_BSC;
  return contractAddress;
};

export const getContractAddressController = (chainId) => {
  const contractAddressController =
    chainId?.toString() === BSC_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_CONTROLLER_BSC
      : chainId?.toString() === MATIC_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_CONTROLLER_MATIC
      : chainId?.toString() === AVALANCHE_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_CONTROLLER_AVALANCHE
      : chainId?.toString() === FANTOM_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_CONTROLLER_FANTOM
      : chainId?.toString() === MOONBEAM_CHAIN_ID.toString()
      ? CONTRACT_ADDRESS_CAPX_CONTROLLER_MOONBEAM
      : CONTRACT_ADDRESS_CAPX_CONTROLLER_ETHEREUM;
  return contractAddressController;
};

export const getExplorer = (chainId) => {
  const explorer =
    chainId?.toString() === ETHEREUM_CHAIN_ID.toString()
      ? EXPLORER_ETHEREUM
      : chainId?.toString() === MATIC_CHAIN_ID.toString()
      ? EXPLORER_MATIC
      : chainId?.toString() === AVALANCHE_CHAIN_ID.toString()
      ? EXPLORER_AVALANCHE
      : chainId?.toString() === FANTOM_CHAIN_ID.toString()
      ? EXPLORER_FANTOM
      : chainId?.toString() === MOONBEAM_CHAIN_ID.toString()
      ? EXPLORER_MOONBEAM
      : EXPLORER_BSC;
  return explorer;
};

export const getVestingURL = (chainId) => {
  const vestingURL =
    chainId?.toString() === BSC_CHAIN_ID.toString()
      ? GRAPHAPIURL_VESTING_BSC
      : chainId?.toString() === MATIC_CHAIN_ID.toString()
      ? GRAPHAPIURL_VESTING_MATIC
      : chainId?.toString() === AVALANCHE_CHAIN_ID.toString()
      ? GRAPHAPIURL_VESTING_AVALANCHE
      : chainId?.toString() === FANTOM_CHAIN_ID.toString()
      ? GRAPHAPIURL_VESTING_FANTOM
      : chainId?.toString() === MOONBEAM_CHAIN_ID.toString()
      ? GRAPHAPIURL_VESTING_MOONBEAM
      : GRAPHAPIURL_VESTING_ETHEREUM;
  return vestingURL;
};

export const getWrappedURL = (chainId) => {
  const wrappedURL =
    chainId?.toString() === BSC_CHAIN_ID.toString()
      ? GRAPHAPIURL_WRAPPED_BSC
      : chainId?.toString() === MATIC_CHAIN_ID.toString()
      ? GRAPHAPIURL_WRAPPED_MATIC
      : chainId?.toString() === AVALANCHE_CHAIN_ID.toString()
      ? GRAPHAPIURL_WRAPPED_AVALANCHE
      : chainId?.toString() === FANTOM_CHAIN_ID.toString()
      ? GRAPHAPIURL_WRAPPED_FANTOM
      : chainId?.toString() === MOONBEAM_CHAIN_ID.toString()
      ? GRAPHAPIURL_WRAPPED_MOONBEAM
      : GRAPHAPIURL_WRAPPED_ETHEREUM;
  return wrappedURL;
};

export const getMasterURL = (chainId) => {
  const masterURL =
    chainId?.toString() === BSC_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_BSC
      : chainId?.toString() === MATIC_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_MATIC
      : chainId?.toString() === AVALANCHE_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_AVALANCHE
      : chainId?.toString() === FANTOM_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_FANTOM
      : chainId?.toString() === MOONBEAM_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_MOONBEAM
      : GRAPHAPIURL_MASTER_ETHEREUM;
  return masterURL;
};
