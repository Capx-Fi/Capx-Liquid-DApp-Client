import "./ProjectOwnerDashboardScreen.scss";
import Table from "rc-table";
import Column from "rc-table";
import useWindowSize from "../../utils/windowSize";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";

import { getExplorer } from "../../constants/getChainConfig";
const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");
function AllocationTableContainer({
  projectOverviewData,
  projectDisplayID,
  wrappedProjectData,
  vestedProjectData,
}) {
  const [allocationTableDetails, setAllocationTableDetails] = useState([]);
  const { active, account, chainId } = useWeb3React();
  const explorer = chainId && getExplorer(chainId);
  useEffect(() => {
    displayAllocationTableDetails();
  }, [
    projectDisplayID,
    projectOverviewData,
    wrappedProjectData,
    vestedProjectData,
  ]);
  const displayAllocationTableDetails = async () => {
    if (projectOverviewData) {
      let currentProjectDetails = projectOverviewData[projectDisplayID];
      let currentProject = [];
      let currentWrappedProject = wrappedProjectData[projectDisplayID];
      let currentVestedProject = vestedProjectData[projectDisplayID];

      // alert(convertToInternationalCurrencySystem(6800000)); // this outputs 6.8M

      if (currentProjectDetails) {
        if (currentWrappedProject)
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
                      let displayNumericDate = `${unlockDay}/${date.toLocaleDateString(
                        "en-US",
                        {
                          month: "numeric",
                        }
                      )}/${date.toLocaleDateString("en-US", {
                        year: "2-digit",
                      })}`;
                      let numOfTokens = new BigNumber(holder?.tokenAmount)
                        .dividedBy(
                          Math.pow(
                            10,
                            currentProjectDetails.projectTokenDecimal
                          )
                        )
                        .toNumber();
                      return {
                        address: holder.address,
                        displayDate: displayDate,
                        displayNumericDate: displayNumericDate,
                        amount: convertToInternationalCurrencySystem(
                          numOfTokens
                        )
                          .toString()
                          .concat(" ")
                          .concat(currentProjectDetails.projectTokenTicker),
                        wrappedAsset: derivative.id,
                        wrappedAssetTicker: derivative.wrappedTokenTicker,
                        projectTokenTicker:
                          currentProjectDetails.projectTokenTicker,
                        decimal: currentProjectDetails.projectTokenDecimal,
                        date: unlockDate,
                      };
                    })
                  )
                  .flat()
              )
              .flat();
          }
        if (currentVestedProject)
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
                      let displayNumericDate = `${unlockDay}/${date.toLocaleDateString(
                        "en-US",
                        {
                          month: "numeric",
                        }
                      )}/${date.toLocaleDateString("en-US", {
                        year: "2-digit",
                      })}`;
                      let numOfTokens = new BigNumber(holder?.tokenAmount)
                        .dividedBy(
                          Math.pow(
                            10,
                            currentProjectDetails.projectTokenDecimal
                          )
                        )
                        .toNumber();
                      return {
                        address: holder.address,
                        displayDate: displayDate,
                        displayNumericDate: displayNumericDate,
                        amount: convertToInternationalCurrencySystem(
                          numOfTokens
                        )
                          .toString()
                          .concat(" ")
                          .concat(currentProjectDetails.projectTokenTicker),
                        wrappedAsset: derivative.id,
                        wrappedAssetTicker: "N/A",
                        projectTokenTicker:
                          currentProjectDetails.projectTokenTicker,
                        decimal: currentProjectDetails.projectTokenDecimal,
                        date: unlockDate,
                      };
                    })
                  )
                  .flat()
              )
              .flat();
          }
        if (
          currentVestedProject &&
          Object.keys(currentVestedProject)?.length > 0 &&
          currentWrappedProject &&
          Object.keys(currentWrappedProject)?.length > 0
        ) {
          currentProject = [...currentVestedProject, ...currentWrappedProject];
        } else {
          if (
            currentWrappedProject &&
            Object.keys(currentWrappedProject)?.length > 0
          ) {
            currentProject = [...currentWrappedProject];
          } else if (
            currentVestedProject &&
            Object.keys(currentVestedProject)?.length > 0
          ) {
            currentProject = [...currentVestedProject];
          } else {
            currentProject = [];
          }
        }
        // currentProject = [...currentVestedProject, ...currentWrappedProject];
        // currentProject = currentProject.map((project) => {
        //   if(Object.keys(project).length > 0) return project;
        //   else
        //   return [];
        // });
        // currentProject = currentProject.flat();

        // if(Object.keys(currentVestedProject).length > 0 && Object.keys(currentWrappedProject).length > 0){
        //   currentProject = [...currentVestedProject, ...currentWrappedProject];
        // }else{
        //   if(Object.keys(currentWrappedProject).length > 0){
        //     currentProject = [...currentWrappedProject];
        //   }else{
        //     currentProject = [...currentVestedProject];
        //   }
        // }
        currentProject.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        currentProject = [];
      }
      //      if (currentProject !== [undefined]) currentProject = [];
      if (currentProject !== [] || currentProject !== [undefined])
        currentProject = currentProject.map((dataItem, index) => {
          return {
            ...dataItem,
            sr_no: index + 1,
          };
        });
      setAllocationTableDetails([...currentProject]);
    }
  };
  const size = useWindowSize();
  const [displayWidth, setDisplayWidth] = useState(size.width);
  useEffect(() => {
    setDisplayWidth(size.width);
  }, [size]);
  return (
    <section className="allocationtablecontainer">
      <div className="allocationtablecontainer_title">ALLOCATION</div>

      {/* <div className="allocationtablecontainer_innercontainer overview-bottom-content">
        <div className="allocationtablecontainer_innercontainer_table table-wrapper"> */}
      <Table
        data={allocationTableDetails}
        pagination={false}
        scroll={{ y: 280 }}
        emptyText={() => (
          <p className="text-center text-primary-green-100 opacity-50">
            No Allocation Data!
          </p>
        )}
      >
        <Column
          title="Sr.No"
          dataIndex="sr_no"
          key="sr_no"
          width={displayWidth < 768 ? `15%` : `10%`}
          align="center"
        />
        <Column
          title="Address"
          dataIndex="address"
          key="address"
          width={
            displayWidth < 1280 && displayWidth > 767
              ? `20%`
              : displayWidth > 0 && displayWidth < 470
              ? `25%`
              : displayWidth < 768
              ? "35%"
              : `38%`
          }
          align="left"
          render={(text) => {
            if (displayWidth > 1400) return <div>{`${text}`}</div>;
            else if (displayWidth >= 1280)
              return <div>{`${text.substr(0, 14)}...${text.substr(-12)}`}</div>;
            // else if (displayWidth >= 1024)
            //   return <div>{`${text.substr(0, 10)}...${text.substr(-10)}`}</div>;
            else if (displayWidth > 824)
              return <div>{`${text.substr(0, 6)}...${text.substr(-4)}`}</div>;
            else
              return <div>{`${text.substr(0, 4)}...${text.substr(-2)}`}</div>;
          }}
        />
        <Column
          title="Date"
          dataIndex={displayWidth < 1280 ? `displayNumericDate` : "displayDate"}
          align="left"
          width={
            displayWidth < 1280 && displayWidth > 767
              ? `20%`
              : displayWidth > 0 && displayWidth < 400
              ? `25%`
              : `20%`
          }
          key="date"
        />
        <Column
          title="Amount"
          dataIndex="amount"
          key="amount"
          align="left"
          className="text-green"
          render={(text) => {
            return <div>{`${text}`}</div>;
          }}
        />
        {displayWidth < 768 ? null : (
          <Column
            title="Wrapped Token"
            dataIndex="wrappedAssetTicker"
            key="wrappedAssetTicker"
            align="left"
            className="text-green"
            render={(text, row) =>
              text === "N/A" ? (
                <div className="text-error-color-400">{text}</div>
              ) : (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${explorer}${row.wrappedAsset}?a=${row.address}`}
                >
                  {text}
                </a>
              )
            }
          />
        )}
      </Table>
    </section>
  );
}

export default AllocationTableContainer;
