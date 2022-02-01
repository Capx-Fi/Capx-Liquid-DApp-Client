import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
export const fetchProjectDetails = async (showIDs, GRAPHAPIURL) => {
  let projectDataGQL = null;
  const client = new ApolloClient({
    uri: GRAPHAPIURL,
    cache: new InMemoryCache(),
  });
  let _showIDs = showIDs.map((s) => `"${s}"`).join(", ");
  const projectOwnerDataQuery = `query{
    projects
    (where:{id_in : [${_showIDs}]})
    {
      id
      projectOwnerAddress
      projectName
      projectTokenAddress
      projectTokenDecimal
      projectTokenTicker
      projectDocHash
    }
  }`;
  try {
    projectDataGQL = await client.query({
      query: gql(projectOwnerDataQuery),
      fetchPolicy: "network-only",
    });
  } catch (e) {
    console.log(e);
  }
  // let projectDetailsData = {};
  // projectDetailsData.data = {};
  // projectDetailsData.data.projects = [];
  // for(let i=0; i < showIDs.length; i++){
  //   console.log(showIDs.length == projectDataGQL.data.projects.length);
  // }
  // console.log(showIDs);
  // console.log(projectDetailsData);
  // console.log(projectDataGQL);
  return projectDataGQL;
};
