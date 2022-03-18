import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";

import {
  GRAPHAPIURL_MASTER_BSC,
  GRAPHAPIURL_MASTER_MATIC,
  GRAPHAPIURL_MASTER_ETHEREUM,
  MATIC_CHAIN_ID,
  BSC_CHAIN_ID,
  GRAPHAPIURL_MASTER_AVALANCHE,
  AVALANCHE_CHAIN_ID,
} from "../constants/config";

export const checkExistingProject = async (
  address,
  chainId,
  metamaskAccount
) => {
  let description = "";
  let projectExistingData = [];
  let data = {
    name: "",
    description: null,
    exists: false,
  };
  const masterURL =
    chainId?.toString() === BSC_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_BSC
      : chainId?.toString() === MATIC_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_MATIC
      : chainId?.toString() === AVALANCHE_CHAIN_ID.toString()
      ? GRAPHAPIURL_MASTER_AVALANCHE
      : GRAPHAPIURL_MASTER_ETHEREUM;
  const client = new ApolloClient({
    uri: masterURL,
    cache: new InMemoryCache(),
  });
  let projectID = `${metamaskAccount}-LOCK-${address}`;
  const projectExistQuery = `query{
    projects
    
    (where:{projectTokenAddress_contains : "${address}"})
    {
      projectOwnerAddress
      projectName
      projectTokenAddress
      projectTokenTicker
      projectDocHash
    }
  }`;
  try {
    projectExistingData = await client.query({
      query: gql(projectExistQuery),
      fetchPolicy: "network-only",
    });
    projectExistingData = projectExistingData?.data;
    console.log(
      projectExistingData?.projects[0]?.projectOwnerAddress,
      "ped.po"
    );
    console.log(metamaskAccount, "met");

    if (projectExistingData?.projects) {
      const res = await fetch(
        `https://capx-liquid.mypinata.cloud/ipfs/${projectExistingData.projects[0].projectDocHash}`
      );
      const desc = await res.json();
      description = desc.description;
      console.log("description", description);
      data = {
        name: projectExistingData.projects[0].projectName,
        description,
        exists: true,
      };
      return data;
    } else {
      return data;
    }
  } catch (error) {
    console.log(error);
    return data;
  }
};
