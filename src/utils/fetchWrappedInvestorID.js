import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
export const fetchWrappedInvestorID = async (account, GRAPHAPIURL) => {
  let projectDataGQL = null;
  const client = new ApolloClient({
    uri: GRAPHAPIURL,
    cache: new InMemoryCache(),
  });
  const projectOwnerDataQuery = `query{
    projects{
    id
    derivatives{
      holders 
      (where:{address:"${account}",tokenAmount_gt:0}){
        address
      }
    }
  }
}`;
  try {
    projectDataGQL = await client.query({
      query: gql(projectOwnerDataQuery),
      fetchPolicy: "network-only",
    });
    let arr = [];

    projectDataGQL.data.projects
      .map((project) =>
        project?.derivatives
          .map((derivative) => {
            if (derivative.holders.length > 0) {
              arr.push(project.id);
            }
            return arr;
          })
          .flat()
      )
      .flat();
    return arr;
  } catch (e) {
    console.log(e);
  }
};
