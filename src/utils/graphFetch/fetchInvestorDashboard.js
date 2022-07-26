import { ApolloClient, InMemoryCache, gql, cache } from "@apollo/client";
import BigNumber from "bignumber.js";
import Web3 from "web3";

BigNumber.config({
  ROUNDING_MODE: 3,
  DECIMAL_PLACES: 18,
  EXPONENTIAL_AT: [-18, 36],
});

export const fetchInvestorDashboard = async (account, GRAPHAPIURL) => {
  const currentDate = new Date();

  const client = new ApolloClient({
    uri: GRAPHAPIURL,
    cache: new InMemoryCache(),
  });

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

    let investorData = [];
    projectDQL.data.projects.map(async (project) => {
      // 1. Get all WVT holdings of the user.
      project.derivatives.map(async (derivative) => {
        derivative.holders.map(async (holder) => {
          if (
            holder.address.toLowerCase() === account.toLowerCase() &&
            BigNumber(holder.tokenAmount) > BigNumber(0)
          ) {
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
            let numOfTokens = new BigNumber(holder.tokenAmount)
              .dividedBy(Math.pow(10, project.projectTokenDecimal))
              .toNumber();
            investorData.push({
              date: date,
              projectName: project.projectName,
              projectOwnerAddress: project.projectOwnerAddress,
              projectTokenTicker: project.projectTokenTicker,
              projectTokenAddress: project.projectTokenAddress,
              projectTokenDecimal: project.projectTokenDecimal,
              unlockDate: unlockDate,
              wrappedTokenTicker: derivative.wrappedTokenTicker,
              derivativeID: derivative.id,
              numOfTokens: numOfTokens,
              tokenAmount: holder.tokenAmount,
              withdrawAllowed: currentDate >= date,
              holderAddress: account,
              vestID: null,
              displayDate: displayDate,
            });
          }
        });
      });

      // 2. Get all Vested holdings of the user.
      project.locks.map(async (lock) => {
        if (
          lock.address.toLowerCase() === account.toLowerCase() &&
          BigNumber(lock.tokenAmount) > BigNumber(0)
        ) {
          const unixTime = lock.unlockTime;
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
          let numOfTokens = new BigNumber(lock.tokenAmount)
            .dividedBy(Math.pow(10, project.projectTokenDecimal))
            .toNumber();
          investorData.push({
            date: date,
            projectName: project.projectName,
            projectOwnerAddress: project.projectOwnerAddress,
            projectTokenTicker: project.projectTokenTicker,
            projectTokenAddress: project.projectTokenAddress,
            projectTokenDecimal: project.projectTokenDecimal,
            unlockDate: unlockDate,
            wrappedTokenTicker: project.projectTokenTicker,
            derivativeID: lock.vestID,
            numOfTokens: numOfTokens,
            tokenAmount: lock.tokenAmount,
            withdrawAllowed: currentDate >= date,
            holderAddress: account,
            vestID: lock.vestID,
            displayDate: displayDate,
          });
        }
      });
    });

    investorData = await Promise.all(investorData);

    let projectData = {};
    let projectInvestorData = {};
    let projectUnlockedTokens = {};
    let projectTotalTokens = {};
    
    investorData.forEach(function(investor, index) {
      if(!projectData[investor.projectTokenAddress]) {
        projectData[investor.projectTokenAddress] = {
          date: investor.date,
          projectName: investor.projectName,
          projectOwner: investor.projectOwnerAddress,
          projectTokenTicker: investor.projectTokenTicker,
          projectTokenDecimal: investor.projectTokenDecimal,
          totalAllocatedTokens: investor.numOfTokens,
          upcomingUnlockDate: investor.unlockDate
        }
        if(projectTotalTokens[investor.projectTokenAddress] == undefined){
          projectTotalTokens[investor.projectTokenAddress] = 0;
        }
        projectTotalTokens[investor.projectTokenAddress] = projectTotalTokens[investor.projectTokenAddress] + parseInt(investor.numOfTokens);
      } else {
        if(projectData[investor.projectTokenAddress].date > investor.date){
          projectData[investor.projectTokenAddress].date = investor.date;
          projectData[investor.projectTokenAddress].upcomingUnlockDate = investor.unlockDate;
        }
        projectTotalTokens[investor.projectTokenAddress] = projectTotalTokens[investor.projectTokenAddress] + parseInt(investor.numOfTokens);
        projectData[investor.projectTokenAddress].allocatedTokens += investor.numOfTokens; 
      }
    });

    const returnProject = Object.entries(projectData).map(([key,value]) => {
      return {
        projectID: key,
        details: value
      }
    });

    console.log("Project Data", returnProject);

    investorData.forEach(function(investor, index) {
      if(!projectInvestorData[investor.projectTokenAddress]) {
        let data = {
          date: investor.date,
          unlockDate: investor.unlockDate,
          wrappedTokenTicker: investor.wrappedTokenTicker,
          derivativeID: investor.derivativeID,
          numOfTokens: investor.numOfTokens,
          tokenAmount: investor.tokenAmount,
          withdrawAllowed: investor.withdrawAllowed,
          holderAddress: investor.holderAddress,
          vestID: investor.vestID,
          displayDate: investor.displayDate
        };
        if(projectUnlockedTokens[investor.projectTokenAddress] == undefined){
          projectUnlockedTokens[investor.projectTokenAddress] = 0;
        }
        if(investor.withdrawAllowed) {
          projectUnlockedTokens[investor.projectTokenAddress] = projectUnlockedTokens[investor.projectTokenAddress] + parseInt(investor.numOfTokens);
        }
        projectInvestorData[investor.projectTokenAddress] = [data];
      } else {
        let data = {
          date: investor.date,
          unlockDate: investor.unlockDate,
          wrappedTokenTicker: investor.wrappedTokenTicker,
          derivativeID: investor.derivativeID,
          numOfTokens: investor.numOfTokens,
          tokenAmount: investor.tokenAmount,
          withdrawAllowed: investor.withdrawAllowed,
          holderAddress: investor.holderAddress,
          vestID: investor.vestID,
          displayDate: investor.displayDate
        };
        if(investor.withdrawAllowed) {
          projectUnlockedTokens[investor.projectTokenAddress] = projectUnlockedTokens[investor.projectTokenAddress] + parseInt(investor.numOfTokens);
        }
        projectInvestorData[investor.projectTokenAddress].push(data);
      }
    });

    const returnProjectInvestor = Object.entries(projectInvestorData).map(([key,value]) => {
      return {
        projectID: key,
        withdrawnTokens: 0,
        unlockedTokens: projectUnlockedTokens[key],
        totalAllocatedTokens: projectTotalTokens[key],
        details: value
      }
    })
    console.log("Project Investor Date",returnProjectInvestor);

    return investorData;
  } catch (e) {
    console.log(e);
  }
};
