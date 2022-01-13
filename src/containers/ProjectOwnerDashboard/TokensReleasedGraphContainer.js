import "./ProjectOwnerDashboardScreen.scss";

import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";

const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");
function TokensReleasedGraphContainer({
  projectOverviewData,
  projectDisplayID,
  wrappedProjectData,
  vestedProjectData,
}) {
  const [TRGraphDetails, setTRGraphDetails] = useState([]);
  const [tokensReleased, setTokensReleased] = useState(0);
  const [chartOption, setChartOption] = useState({
    chart: {
      type: "area",
      backgroundColor: null,
      height: "260",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },
    plotOptions: {
      area: {
        size: "100%",
        showInLegend: false,
        lineWidth: 2,
        lineColor: "#599504",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(132, 214, 164, 0.3)"],
            [1, "rgba(18, 28, 32, 0.3)"],
          ],
        },
        marker: {
          lineWidth: 0,
          enabled: true,
          symbol: "circle",
          radius: 4,
          fillColor: "#599504",
          lineColor: "#97D10A",

          states: {
            hover: {
              fillColor: "#97D10A",
              lineColor: "green",
              lineWidth: 2,
            },
          },
        },
      },
    },
    yAxis: {
      gridLineColor: "#2C432E",
      title: {
        enabled: false,
      },
    },
    xAxis: {
      categories: [1, 2, 3, 4, 5, 20, 21, 10, 5, 2],
      lineColor: "#2C432E",
      labels: {
        style: {
          fontSize: "8",
          fontWeight: "300",
          color: "#696969",
        },
      },
    },
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    tooltip: {
      backgroundColor: "#151517",
      borderColor: "#151517",
      borderRadius: 8,
      borderWidth: 1,
      useHTML: true,
      formatter: function () {
        return (
          '<span style="color:#97D10A">Date: <b>' +
          this.x +
          "</b> </br>Amount: <b>" +
          this.y +
          "</b></span>"
        );
      },
    },
  });
  useEffect(() => {
    displayTokenReleaseGraphDetails();
  }, [
    projectDisplayID,
    projectOverviewData,
    wrappedProjectData,
    vestedProjectData,
  ]);
  const displayTokenReleaseGraphDetails = async () => {
    if (projectOverviewData.length > 0) {
      let currentProject = [];
      let currentProjectDetails = projectOverviewData[projectDisplayID];
      let currentWrappedProject = wrappedProjectData[projectDisplayID];
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
                      month: "short",
                    });
                    let unlockYear = date.toLocaleDateString("en-US", {
                      year: "2-digit",
                    });
                    let displayGraphDate = `${unlockDay} ${unlockMonth}, ${unlockYear}`;
                    let numOfTokens = new BigNumber(holder?.tokenAmount)
                      .dividedBy(
                        Math.pow(10, currentProjectDetails.projectTokenDecimal)
                      )
                      .toNumber();

                    return {
                      address: holder.address,
                      date: unlockDate,
                      unixDate: date,
                      numOfTokens,
                      amount: numOfTokens
                        .toString()
                        .concat(" ")
                        .concat(currentProjectDetails.projectTokenTicker),
                      projectTokenTicker:
                        currentProjectDetails.projectTokenTicker,
                      totalSupply: derivative.totalSupply,
                      displayGraphDate,
                      decimal: currentProjectDetails.projectTokenDecimal,
                    };
                  })
                )
                .flat()
            )
            .flat();
        }
      let currentVestedProject = vestedProjectData[projectDisplayID];
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
                      month: "short",
                    });
                    let unlockYear = date.toLocaleDateString("en-US", {
                      year: "2-digit",
                    });
                    let displayGraphDate = `${unlockDay} ${unlockMonth}, ${unlockYear}`;
                    let numOfTokens = new BigNumber(holder?.tokenAmount)
                      .dividedBy(
                        Math.pow(10, currentProjectDetails.projectTokenDecimal)
                      )
                      .toNumber();

                    return {
                      address: holder.address,
                      date: unlockDate,
                      unixDate: date,
                      numOfTokens,
                      amount: numOfTokens
                        .toString()
                        .concat(" ")
                        .concat(currentProjectDetails.projectTokenTicker),
                      projectTokenTicker:
                        currentProjectDetails.projectTokenTicker,
                      totalSupply: derivative.totalLockedSupply,
                      displayGraphDate,
                      decimal: currentProjectDetails.projectTokenDecimal,
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
      currentProject.sort((a, b) => new Date(a.date) - new Date(b.date));
      let tre = 0;
      currentProject.map((project) => {
        if (currentDate > project.unixDate) {
          tre = tre + project.numOfTokens;
        }
        return tre;
      });
      setTokensReleased(tre);
      let charXAxis = [];
      let charYAxis = [];
      var holder = {};

      currentProject.forEach(function (d) {
        if (holder.hasOwnProperty(d.displayGraphDate)) {
          holder[d.displayGraphDate] =
            holder[d.displayGraphDate] + d.numOfTokens;
        } else {
          holder[d.displayGraphDate] = d.numOfTokens;
        }
      });
      var graphData = [];

      for (var prop in holder) {
        graphData.push({ displayGraphDate: prop, numOfTokens: holder[prop] });
      }

      graphData.forEach((element) => {
        charXAxis.push(element.displayGraphDate);
        charYAxis.push(
          element.numOfTokens
        );
      });
      setChartOption({
        ...chartOption,
        xAxis: { ...chartOption.xAxis, categories: charXAxis },
        series: [{ data: charYAxis }],
      });
      setTRGraphDetails([...currentProject]);
    }
  };

  return (
    <section className="tokensreleasedgraphcontainer">
      <div className="tokensreleasedgraphcontainer_titlecontainer">
        <div className="tokensreleasedgraphcontainer_titlecontainer_title">
          TOKENS RELEASED SO FAR
        </div>
        <div className="tokensreleasedgraphcontainer_titlecontainer_tokensreleased">
          <div className="tokensreleasedgraphcontainer_titlecontainer_tokensreleased_value">
            {convertToInternationalCurrencySystem(tokensReleased)}{" "}
            {TRGraphDetails[0]?.projectTokenTicker}
          </div>
          <div className="tokensreleasedgraphcontainer_titlecontainer_tokensreleased_date">
            {datetime}
          </div>
        </div>
      </div>

      <div className="tokensreleasedgraphcontainer_innercontainer">
        <HighchartsReact
          highcharts={Highcharts}
          containerProps={{ style: { height: "100%" } }}
          options={chartOption}
          oneToOne={true}
          updateArgs={[true, true, true]}
        />
      </div>
    </section>
  );
}

export default TokensReleasedGraphContainer;
