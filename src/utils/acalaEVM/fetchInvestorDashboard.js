import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import axios from "axios";
import Web3 from "web3";
import { data } from "jquery";
import {
  ACALA_URL,
  GET_BALANCE_PART_1,
  GET_BALANCE_PART_2,
} from "../../constants/config";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const fetchInvestorDashboard = async (account, GRAPHAPIURL) => {
  //TODO: Get chain based config from env variable
  const URL = ACALA_URL;
  const currentDate = new Date();

  const GET_BALANCE_PART_1 = GET_BALANCE_PART_1;
  const GET_BALANCE_PART_2 = GET_BALANCE_PART_2;

  const web3 = new Web3(Web3.givenProvider);

  const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
  });

  let allProjects = [];
  let allDerivatives = [];

  const query = `query {
        projects {
          nodes {
            id
            projectName
            projectTokenTicker
            projectOwnerAddress
            projectTokenAddress
            projectTokenDecimal
            projectDocHash
            derivative {
                nodes {
                    id
                    wrappedTokenTicker
                    unlockTime
                    totalSupply
                }
            }
            lock {
                nodes {
                    id
                    vestID
                    address
                    tokenAmount
                    unlockTime
                }
              }
            }
        }
      }`;
  try {
    let projectDQL = await client.query({
      query: gql(query),
      fetchPolicy: "network-only",
    });

    let wrappedHoldings = [];
    let vestedHoldings = [];

    // Get All Projects
    allProjects = projectDQL.data.projects.nodes.map(async (project) => {
      wrappedHoldings = project.derivative.nodes.map(async (derivative) => {
        let _derivative = web3.utils.toChecksumAddress(derivative.id);
        let _account = web3.utils.toChecksumAddress(account);
        const query =
          GET_BALANCE_PART_1 + _derivative + GET_BALANCE_PART_2 + _account;
        let response = await axios.get(query);
        let _tokenAmount = new BigNumber(response.data.result);
        if (!_tokenAmount.eq(0, 10)) {
          const unixTime = derivative.unlockTime;
          const date = new Date(unixTime * 1000);
          let unlockDate = date.toLocaleDateString("en-US");
          let unlockDay = date.toLocaleDateString("en-US", {
            day: "numeric",
          });
          let unlockMonth = date.toLocaleDateString("en-US", {
            month: "long",
          });
          let unlockYear = date.toLocaleDateString("en-US", {
            year: "numeric",
          });
          let displayDate = `${unlockDay} ${unlockMonth}, ${unlockYear}`;
          let numOfTokens = _tokenAmount
            .dividedBy(Math.pow(10, project.projectTokenDecimal))
            .toNumber();
          return {
            data: date,
            projectName: project.projectName,
            projectOwnerAddress: project.projectOwnerAddress.replace("\\", "0"),
            projectTokenTicker: project.projectTokenTicker,
            projectTokenAddress: project.projectTokenAddress.replace("\\", "0"),
            projectTokenDecimal: project.projectTokenDecimal,
            unlockDate: unlockDate,
            wrappedTokenTicker: derivative.wrappedTokenTicker,
            derivativeID: derivative.id,
            numOfTokens: numOfTokens,
            tokenAmount: _tokenAmount,
            withdrawAllowed: currentDate >= date,
            holderAddress: account,
            vestID: null,
            displayDate: displayDate,
          };
        }
      });
      vestedHoldings = project.lock.nodes.map(async (lock) => {
        if (lock.address.toLowerCase() === account.toLowerCase()) {
          const unixTime = lock.unlockTime;
          const date = new Date(unixTime * 1000);
          let unlockDate = date.toLocaleDateString("en-US");
          let unlockDay = date.toLocaleDateString("en-US", {
            day: "numeric",
          });
          let unlockMonth = date.toLocaleDateString("en-US", {
            month: "long",
          });
          let unlockYear = date.toLocaleDateString("en-US", {
            year: "numeric",
          });
          let displayDate = `${unlockDay} ${unlockMonth}, ${unlockYear}`;
          let numOfTokens = new BigNumber(lock.tokenAmount)
            .dividedBy(Math.pow(10, project.projectTokenDecimal))
            .toNumber();
          return {
            data: date,
            projectName: project.projectName,
            projectOwnerAddress: project.projectOwnerAddress.replace("\\", "0"),
            projectTokenTicker: project.projectTokenTicker,
            projectTokenAddress: project.projectTokenAddress.replace("\\", "0"),
            projectTokenDecimal: project.projectTokenDecimal,
            unlockDate: unlockDate,
            wrappedTokenTicker: project.projectTokenTicker,
            derivativeID: lock.vestID,
            numOfTokens: numOfTokens,
            tokenAmount: lock.tokenAmount,
            withdrawAllowed: currentDate >= date,
            holderAddress: account,
            vestID: lock.vestID,
            displayDate: displayDate,
          };
        }
      });
      wrappedHoldings = await Promise.all(wrappedHoldings);
      vestedHoldings = await Promise.all(vestedHoldings);
      let combined = [];
      for (let i = 0; i < wrappedHoldings.length; i++) {
        if (wrappedHoldings[i] != undefined) {
          combined.push(wrappedHoldings[i]);
        }
      }
      for (let i = 0; i < vestedHoldings.length; i++) {
        if (vestedHoldings[i] != undefined) {
          combined.push(vestedHoldings[i]);
        }
      }
      return combined;
    });
    allProjects = await Promise.all(allProjects);
    let combined = [];
    for (let i = 0; i < allProjects.length; i++) {
      combined = combined.concat(allProjects[i]);
    }
    return combined;
  } catch (e) {
    console.log(e);
  }
};
