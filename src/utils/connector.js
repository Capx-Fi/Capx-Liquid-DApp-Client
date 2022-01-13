import { InjectedConnector } from "@web3-react/injected-connector";
// console.log(
//   process.env.REACT_APP_SUPPORTED_CHAIN_IDS.replace(/^"(.*)"$/, "$1")
// );
export const injected = new InjectedConnector({
  supportedChainIds:
    process.env.REACT_APP_SUPPORTED_CHAIN_IDS.replace(/['"]+/g, '').split(", ").map(Number),
});
