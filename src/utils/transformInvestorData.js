import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";

const currentDate = new Date();

export const transformInvestorData = async (
  account,
  projectOverviewData,
  wrappedProjectData,
  vestedProjectData
) => {
  let projects = [];
  if (projectOverviewData.length > 0) {
    for (
      let projectDisplayID = 0;
      projectDisplayID < projectOverviewData.length;
      projectDisplayID++
    ) {
      let projectName = projectOverviewData[projectDisplayID].projectName;
      let projectOwnerAddress =
        projectOverviewData[projectDisplayID].projectOwnerAddress;
      let projectTokenAddress =
        projectOverviewData[projectDisplayID].projectTokenAddress;
      let projectTokenTicker =
        projectOverviewData[projectDisplayID].projectTokenTicker;
      let projectTokenDecimal = Number(
        projectOverviewData[projectDisplayID].projectTokenDecimal
      );
      let currentProjectDetails = projectOverviewData[projectDisplayID];
      let currentWrappedProject = wrappedProjectData[projectDisplayID];
      if (currentWrappedProject) {
        if (Object.keys(currentWrappedProject).length > 0) {
          currentWrappedProject = [currentWrappedProject]
            .map((project) =>
              project?.derivatives
                .map((derivative, _index) =>
                  derivative.holders.map((holder, index) => {
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
                      .dividedBy(Math.pow(10, projectTokenDecimal))
                      .toNumber();
                    return {
                      date: date,
                      projectName: projectName,
                      projectOwnerAddress: projectOwnerAddress,
                      projectTokenAddress: projectTokenAddress,
                      projectTokenTicker: projectTokenTicker,
                      projectTokenDecimal: projectTokenDecimal,
                      unlockDate: unlockDate,
                      wrappedTokenTicker: derivative.wrappedTokenTicker,
                      derivativeID: derivative.id,
                      numOfTokens: numOfTokens,
                      tokenAmount: holder?.tokenAmount,
                      withdrawAllowed: currentDate >= date,
                      holderAddress: holder?.address,
                      vestID: null,
                      displayDate: displayDate,
                    };
                  })
                )
                .flat()
            )
            .flat();
        }
      }
      let currentVestedProject = vestedProjectData[projectDisplayID];
      if (currentVestedProject) {
        if (Object.keys(currentVestedProject).length > 0) {
          currentVestedProject = [currentVestedProject]
            .map((project) =>
              project?.derivatives
                .map((derivative, _index) =>
                  derivative.holders.map((holder, index) => {
                    const unixTime = holder.unlockTime;
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
                      .dividedBy(Math.pow(10, projectTokenDecimal))
                      .toNumber();
                    return {
                      date: date,
                      projectName: projectName,
                      projectOwnerAddress: projectOwnerAddress,
                      projectTokenAddress: projectTokenAddress,
                      projectTokenTicker: projectTokenTicker,
                      unlockDate: unlockDate,
                      wrappedTokenTicker: projectTokenTicker,
                      derivativeID: holder.vestID,
                      numOfTokens: numOfTokens,
                      tokenAmount: holder?.tokenAmount,
                      withdrawAllowed: currentDate >= date,
                      holderAddress: holder?.address,
                      vestID: holder.vestID,
                      displayDate: displayDate,
                    };
                  })
                )
                .flat()
            )
            .flat();
        }
      }
      if (
        currentVestedProject &&
        Object.keys(currentVestedProject)?.length > 0 &&
        currentWrappedProject &&
        Object.keys(currentWrappedProject)?.length > 0
      ) {
        projects = [
          ...projects,
          ...currentVestedProject,
          ...currentWrappedProject,
        ];
      } else {
        if (
          currentWrappedProject &&
          Object.keys(currentWrappedProject)?.length > 0
        ) {
          projects = [...projects, ...currentWrappedProject];
        } else if (
          currentVestedProject &&
          Object.keys(currentVestedProject)?.length > 0
        ) {
          projects = [...projects, ...currentVestedProject];
        }
      }
    }
    projects.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  let _userProjects = [];
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].holderAddress.toLowerCase() === account.toLowerCase()) {
      _userProjects.push(projects[i]);
    }
  }
  return _userProjects;
};
