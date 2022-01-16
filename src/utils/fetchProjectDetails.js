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
  }
  return projectDataGQL;
};
