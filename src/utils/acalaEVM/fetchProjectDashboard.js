import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import axios from "axios";
import Web3 from "web3";
import { data } from "jquery";
import {
  ACALA_URL,
  GET_BALANCE_P1,
  GET_BALANCE_P2,
  GET_HOLDERS_P1,
  GET_HOLDERS_P2,
  GET_HOLDERS_P3,
} from "../../constants/config";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

//TODO: Review this function
export const fetchAcalaProjectDashboard = async (account, GRAPHAPIURL) => {
  // TODO : Below 6 and RPC to be configured as chain specific env variable
  const URL = ACALA_URL;

  const GET_BALANCE_PART_1 = GET_BALANCE_P1;
  const GET_BALANCE_PART_2 = GET_BALANCE_P2;
  const GET_HOLDERS_PART_1 = GET_HOLDERS_P1;
  const GET_HOLDERS_PART_2 = GET_HOLDERS_P2;
  const GET_HOLDERS_PART_3 = GET_HOLDERS_P3;

  const web3 = new Web3(Web3.givenProvider);

  const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
  });

  let allProjects = [];
  let allDerivatives = [];
  let validProjectIDs = [];

  let vestedProjectDetails = [];
  let wrappedProjectDetails = [];
  let projectOwnerData = [];
  // 1. Get All Projects where the user is the owner of the project
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
    allProjects = await Promise.all(projectDQL.data.projects.nodes.map(async (project) => {
      // Check if the account is the project owner.
      if(project.projectOwnerAddress.toLowerCase() === account.toLowerCase()){
        validProjectIDs.push(project.id);
      }
      // Fetch all derivative IDs 
      let derivatives = await Promise.all(project.derivative.nodes.map(async (derivative) => {
        return derivative.id;
      }));
      let _id = project.id;
      allDerivatives.push({ projectID: _id, derivatives: derivatives });
      let _totalLocked = new BigNumber(0);
      let xdata = await Promise.all(project.lock.nodes.map(async (lock) => {
        _totalLocked = _totalLocked.plus(new BigNumber(lock.tokenAmount));
        let _data = {
          address: lock.address,
          tokenAmount: lock.tokenAmount,
          unlockTime: lock.unlockTime,
          vestID: lock.vestID,
        };
        return _data;
      }));
      xdata = xdata.filter((lock) => {
        return lock;
      });
      if (xdata.length > 0 && !_totalLocked.isZero()) {
        let _holders = {
          id: project.projectTokenAddress.replace("\\", "0"),
          totalLockedSupply: _totalLocked.toString(10),
          holders: xdata,
        };
        let _vestLock = {
          id: project.id,
          derivatives: [_holders],
        };
        vestedProjectDetails.push(_vestLock);
      }
      let data = {
        id: project.id,
        projectOwnerAddress: project.projectOwnerAddress.replace("\\", "0"),
        projectName: project.projectName,
        projectDocHash: project.projectDocHash,
        projectTokenTicker: project.projectTokenTicker,
        projectTokenAddress: project.projectTokenAddress.replace("\\", "0"),
        projectTokenDecimal: project.projectTokenDecimal,
        derivatives: project.derivative.nodes,
        locks: project.lock.nodes,
      };
      return data;
    }));

    // 2. Fetch the IDs of the project where the user is investor.
    await Promise.all(allDerivatives.map(async(project) => {
      if(!validProjectIDs.includes(project.projectID)){
        // Where the user is not a participant in vested locks format.
        // Check if the user holds any derivative corresponding to this project.
        await Promise.all(project.derivatives.map(async (derivative) => {
          let _derivative = web3.utils.toChecksumAddress(derivative);
          let _account = web3.utils.toChecksumAddress(account);
          const query =
            GET_BALANCE_PART_1 + _derivative + GET_BALANCE_PART_2 + _account;
          let response = await axios.get(query);
          if(new BigNumber(response.data.result).gt(0,10)){
            validProjectIDs.push(project.projectID);
          } 
        }
      ));
      }
      }
    ));
    validProjectIDs = validProjectIDs.filter((item, i, ar) => ar.indexOf(item) === i);

    // 3. Get All Holders for the project.
    await Promise.all(allProjects.map(async (project) => {
      if (validProjectIDs.includes(project.id)) {
        // Get all derivatives corresponding to the project.
        let _derivatives = await Promise.all(project.derivatives.map(async (derivative) => {
          let _id = web3.utils.toChecksumAddress(derivative.id);
          let _page = 1;
          let _holders = [];
          while (true) {
            const query =
              GET_HOLDERS_PART_1 +
              _id +
              GET_HOLDERS_PART_2 +
              _page +
              GET_HOLDERS_PART_3;
            let response = await axios.get(query);
            if (response.data.result.length === 0) {
              break;
            }
            // Process the Holders.
            _holders = await Promise.all(response.data.result.map(async (holder) => {
              let data = {
                address: holder.address,
                tokenAmount: holder.value,
              };
              return data;
            }));
            _page += 1;
          }
          let _derivativeObject = {
            id: derivative.id,
            totalSupply: derivative.totalSupply,
            unlockTime: derivative.unlockTime,
            wrappedTokenTicker: derivative.wrappedTokenTicker,
            holders: _holders,
          };
          return _derivativeObject;
        }));
        let _projectData = {
          id: project.id,
          projectDocHash: project.projectDocHash,
          projectName: project.projectName,
          projectOwnerAddress: project.projectOwnerAddress,
          projectTokenAddress: project.projectTokenAddress,
          projectTokenDecimal: project.projectTokenDecimal,
          projectTokenTicker: project.projectTokenTicker,
        };
        projectOwnerData.push(_projectData);
        let _project = {
          id: project.id,
          derivatives: _derivatives,
        };
        wrappedProjectDetails.push(_project);
      }
    }));
    let data1 = [];
    let data2 = [];
    let data3 = [];
    for (let i = 0; i < validProjectIDs.length; i++) {
      if (projectOwnerData[i]?.id != undefined) {
        data1.push(projectOwnerData[i]);
        for (let j = 0; j < wrappedProjectDetails.length; j++) {
          if (wrappedProjectDetails[j].id === projectOwnerData[i].id) {
            data2.push(wrappedProjectDetails[j]);
            break;
          }
        }
        for (let k = 0; k < vestedProjectDetails.length; k++) {
          if (vestedProjectDetails[k].id === projectOwnerData[i].id) {
            data3.push(vestedProjectDetails[k]);
            break;
          } else {
            data3.push({});
          }
        }
      }
    }
    return [data1, data2, data3];
  } catch (e) {
    console.log(e);
  }
};
