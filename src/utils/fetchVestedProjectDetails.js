import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
export const fetchVestedProjectDetails = async (showIDs, GRAPHAPIURL) => {
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
      derivatives{
        id
        totalLockedSupply
        holders
        (where: {tokenAmount_gt : 0})
        
        {
          unlockTime
          vestID
          tokenAmount
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
	} catch (e) {
		console.log(e);
	}
	let projectDetailsData = {};
	projectDetailsData.data = {};
	projectDetailsData.data.projects = [];
	if (showIDs.length != projectDataGQL.data.projects.length) {
		// inconsistency in data
		const _projectIDs = [];
		for (let i = 0; i < projectDataGQL.data.projects.length; i++) {
			_projectIDs.push(projectDataGQL.data.projects[i].id);
		}
		// console.log("ProjectIDs",_projectIDs);
		for (let i = 0; i < showIDs.length; i++) {
			// console.log(i, _projectIDs.indexOf(showIDs[i]));
			if (_projectIDs.indexOf(showIDs[i]) == -1) {
				projectDetailsData.data.projects[i] = {};
			} else {
				projectDetailsData.data.projects[i] =
					projectDataGQL.data.projects[_projectIDs.indexOf(showIDs[i])];
			}
		}
		return projectDetailsData;
	}
	return projectDataGQL;
};
