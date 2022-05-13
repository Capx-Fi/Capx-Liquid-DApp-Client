import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";

import { getMasterURL } from "../constants/getChainConfig";

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
  const masterURL = getMasterURL(chainId);
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
    // console.log(
    //   projectExistingData?.projects[0]?.projectOwnerAddress,
    //   "ped.po"
    // );
    // console.log(metamaskAccount, "met");

    if (projectExistingData?.projects) {
      const res = await fetch(
        `https://capx-liquid.mypinata.cloud/ipfs/${projectExistingData.projects[0].projectDocHash}`
      );
      const desc = await res.json();
      description = desc.description;
      // console.log("description", description);
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
