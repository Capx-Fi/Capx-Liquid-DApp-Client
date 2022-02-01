import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
export const fetchOwnerID = async (account, GRAPHAPIURL) => {
  let projectDataGQL = null;
  const client = new ApolloClient({
    uri: GRAPHAPIURL,
    cache: new InMemoryCache(),
  });
  const projectOwnerDataQuery = `query{
  projects(where: {projectOwnerAddress:"${account}"}){
    id
  }
}`;
  try {
    projectDataGQL = await client.query({
      query: gql(projectOwnerDataQuery),
      fetchPolicy: "network-only",
    });
      const arr = [];
      projectDataGQL.data.projects.map((project) => {
        arr.push(project.id);
        return arr;
      });
      return arr;
  } catch (e) {
    console.log(e);
  }

};
