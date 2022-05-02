import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
const currentDate = new Date();
export const fetchOwnedTokens = async ( account, setOwnedProjectsData, GRAPHAPIURL) => {
    const client = new ApolloClient({
      uri: GRAPHAPIURL,
      cache: new InMemoryCache(),
    });
  let userProjects = [];
  // console.log(account,"maccou");
  const userDataQuery = `query{
  projects {
        projectOwnerAddress
    projectName
    projectTokenAddress
    projectTokenTicker
    projectTokenDecimal
    derivatives{
            id
      unlockTime
      totalSupply
      wrappedTokenTicker
      holders
      (where : {address_contains:"${account}",tokenAmount_gt:0} 
      ) {
        tokenAmount
        address
      }
    }
  }
}`;
  try {
    const userData = await client.query({
      query: gql(userDataQuery),
      fetchPolicy: "network-only",
    });

    userProjects = userData.data.projects
      .map((project) =>
        project?.derivatives
          .map((derivative) =>
            derivative.holders.map((holder) => {
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
              let numOfTokens = new BigNumber(holder?.tokenAmount)
                .dividedBy(
                  Math.pow(10, project.projectTokenDecimal)
                )
                .toNumber();
              return {
                date:date,
                projectName: project.projectName,
                projectOwnerAddress: project.projectOwnerAddress,
                projectTokenAddress: project.projectTokenAddress,
                projectTokenTicker: project.projectTokenTicker,
                unlockDate: unlockDate,
                wrappedTokenTicker: derivative.wrappedTokenTicker,
                derivativeID: derivative.id,
                numOfTokens: numOfTokens,
                tokenAmount:holder?.tokenAmount,
                withdrawAllowed: currentDate>=date,
                holderAddress: holder?.address,
                displayDate: displayDate,
              };
            })
          )
          .flat()
      )
      .flat();
      userProjects.sort((a, b) => new Date(a.date) - new Date(b.date));
    setOwnedProjectsData([...userProjects]);

    // console.log(userProjects);
  } catch (e) {
    console.log(e);
  }
};
