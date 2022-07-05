import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import Web3 from "web3";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

//TODO: Review this function
export const fetchProjectOverviewDetails = async (account, GRAPHAPIURL) => {
  // TODO : Below 6 and RPC to be configured as chain specific env variable
  const URL = "https://api.thegraph.com/subgraphs/name/shreyas3336/capx-liquid-polygon";

  const client = new ApolloClient({
    uri: URL,
    cache: new InMemoryCache(),
  });
  const web3 = new Web3(Web3.givenProvider);

  let vestedProjectDetails = [];
  let wrappedProjectDetails = [];
  let projectOwnerData = [];
  // 1. Get All Projects where the user is the owner of the project
  const query = `
  query {
    projects {
        id
        projectName
        projectTokenTicker
        projectOwnerAddress
        projectTokenAddress
        projectTokenDecimal
        projectDocHash
        derivatives {
            id
            wrappedTokenTicker
            unlockTime
            totalSupply
              holders {
              id
              address
              tokenAmount
            }
        }
        locks {
            id
            vestID
            address
            tokenAmount
            unlockTime
        }
    }
}`;
  try {
    let projectDQL = await client.query({
      query: gql(query),
      fetchPolicy: "network-only",
    });
    
    let validProjectIDs = [];
    // 1. Fetch the projects where the user is Owner.
    projectDQL.data.projects.map(async(project) => {
        if(project.projectOwnerAddress.toLowerCase() === account.toLowerCase()){
            validProjectIDs.push(project.id);
        }
    });

    // 2. Fetch Projects where the user is Investor.
    projectDQL.data.projects.map(async(project) => {
        project.derivatives.map(async(derivative) => {
            derivative.holders.map(async(holder) => {
                if(BigNumber(holder.tokenAmount) > BigNumber(0) && holder.address.toLowerCase() === account.toLowerCase()){
                    if(!validProjectIDs.includes(project.id)){
                        validProjectIDs.push(project.id);
                    }
                }
            });
        });
        project.locks.map(async(lock) => {
            if(BigNumber(lock.tokenAmount) > BigNumber(0) && lock.address.toLowerCase() === account.toLowerCase()){
                if(!validProjectIDs.includes(project.id)){
                    validProjectIDs.push(project.id);
                }
            }
        });
    });
    validProjectIDs = await Promise.all(validProjectIDs);
    // 3. Return Objects
    projectDQL.data.projects.map(async(project) => {
        // If the project is part of the valid set.
        if(validProjectIDs.includes(project.id)) {

            // 3.1 Fill the projectOwnerData
            projectOwnerData.push({
                id: project.id,
                projectDocHash: project.projectDocHash,
                projectName: project.projectName,
                projectOwnerAddress: web3.utils.toChecksumAddress(project.projectOwnerAddress),
                projectTokenAddress: web3.utils.toChecksumAddress(project.projectTokenAddress),
                projectTokenDecimal: project.projectTokenDecimal,
                projectTokenTicker: project.projectTokenTicker
            }); 

            // 3.2 Fill the wrappedProjectDetails
            let _derivatives = [];
            project.derivatives.map(async(derivative) => {
                let _holders = [];
                derivative.holders.map(async(holder) => {
                    // Only Display holders where the balance is greater than zero.
                    if(BigNumber(holder.tokenAmount) > BigNumber(0)) {
                        _holders.push(holder);
                    }
                });
                if(_holders.length > 0) {
                    _derivatives.push({
                        id: web3.utils.toChecksumAddress(derivative.id),
                        totalSupply: derivative.totalSupply,
                        unlockTime: derivative.unlockTime,
                        wrappedTokenTicker: derivative.wrappedTokenTicker,
                        holders: _holders,
                    });
                }
            });
            if(_derivatives.length > 0) {
                wrappedProjectDetails.push({
                    id: project.id,
                    derivatives: _derivatives
                });
            } else {
                wrappedProjectDetails.push({});
            }

            // 3.3 Fill the vestedProjectDetails
            let _locks = [];
            let _totalSupply = BigNumber(0);
            project.locks.map(async(lock) => {
                if(BigNumber(lock.tokenAmount) > BigNumber(0)) {
                    _locks.push({
                        vestID: lock.vestID,
                        address: web3.utils.toChecksumAddress(lock.address),
                        tokenAmount: lock.tokenAmount,
                        unlockTime: lock.unlockTime,
                    });
                    _totalSupply = _totalSupply.plus(new BigNumber(lock.tokenAmount));
                }
            });
            if(_locks.length > 0) {
                vestedProjectDetails.push({
                    id: project.id,
                    derivatives: {
                        id: web3.utils.toChecksumAddress(project.projectTokenAddress),
                        totalLockedSupply: _totalSupply,
                        holders: _locks
                    }
                });
            } else {
                vestedProjectDetails.push({});
            }
        }
    });
    projectOwnerData = await Promise.all(projectOwnerData);
    wrappedProjectDetails = await Promise.all(wrappedProjectDetails);
    vestedProjectDetails = await Promise.all(vestedProjectDetails);

    return [projectOwnerData,wrappedProjectDetails,vestedProjectDetails];
  } catch (e) {
    console.log(e);
  }
};
