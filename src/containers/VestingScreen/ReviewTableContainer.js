import "./VestingScreen.scss";
import Table from "rc-table";
import Column from "rc-table";
import useWindowSize from "../../utils/windowSize";
import { useEffect, useState } from "react";
import CheckIcon from "../../assets/check.svg";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";
import InfoIcon from "../../assets/info.svg";
import { Tooltip, withStyles } from "@material-ui/core";

function ReviewTableContainer({
  reviewData,
  setVestingDataSellable,
  setVestingDataWrapped,
}) {
  const size = useWindowSize();
  const [displayWidth, setDisplayWidth] = useState(size.width);
  useEffect(() => {
    setDisplayWidth(size.width);
  }, [size]);
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      background: "#2A383C",
      color: "#F1FAF2",
      maxWidth: 800,
      fontSize: theme.typography.pxToRem(12),
      borderRadius: "4px",
      zIndex: 100,
    },
  }))(Tooltip);
  const toggleSellable = (e, i, val) => {
    setVestingDataSellable(
      [...reviewData].map((object, index) => {
        if (index === i) {
          return {
            ...object,
            isSellable: !object.isWrapped ? val : !val,
          };
        } else return object;
      })
    );
  };

  const toggleWrapped = (e, i, val) => {
    setVestingDataWrapped(
      [...reviewData].map((object, index) => {
        if (index === i) {
          return {
            ...object,
            isWrapped: !val,
            isSellable: val ? false : object.isSellable,
          };
        } else return object;
      })
    );
  };
  return (
    <section className="reviewtablecontainer">
      <Table
        data={reviewData}
        pagination={false}
        className="text-black"
        scroll={{
          y: displayWidth > 1450 ? 280 : displayWidth > 1023 ? 240 : 190,
        }}
        emptyText={() => <p className="text-center">No Allocatiion Data!</p>}
      >
        <Column
          title={<p className="text-titleGray">Sr. No.</p>}
          dataIndex="Sr. No."
          key="Sr. No."
          width={displayWidth < 825 ? `50px` : `10%`}
          align="center"
          render={(text) => <p className="text-black">{text}</p>}
        />
        <Column
          title={<p className="text-titleGray">Address</p>}
          dataIndex="Address"
          key="Address"
          width={
            displayWidth < 1280 && displayWidth > 824
              ? `28%`
              : displayWidth < 825
              ? "100px"
              : `33%`
          }
          align="left"
          render={(text) => {
            if (displayWidth > 1750)
              return <div className="text-black">{`${text}`}</div>;
            else if (displayWidth > 1280)
              return (
                <div className="text-black">{`${text.substr(
                  0,
                  14
                )}...${text.substr(-12)}`}</div>
              );
            else if (displayWidth > 824)
              return (
                <div className="text-black">{`${text.substr(
                  0,
                  6
                )}...${text.substr(-4)}`}</div>
              );
            else
              return (
                <div className="text-black">{`${text.substr(
                  0,
                  4
                )}...${text.substr(-4)}`}</div>
              );
          }}
        />
        <Column
          title={<p className="text-titleGray">Date</p>}
          dataIndex={"Date(DD-MM-YYYY)"}
          align="center"
          width={displayWidth < 825 ? `120px` : `20%`}
          key="date"
          render={(text) => {
            var kp;
            if (text.includes("/")) {
              kp = text.toString().split("/").join("-");
            } else kp = text.toString().split("-").join("-");
            return <p className="text-black">{kp}</p>;
          }}
        />
        <Column
          title={<p className="text-titleGray">Amount</p>}
          dataIndex="Amount of Tokens"
          key="amount"
          align="center"
          width={displayWidth < 825 ? `50px` : `10%`}
          className="text-green"
          render={(text) => {
            return convertToInternationalCurrencySystem(text);
          }}
        />
        {false ? null : (
          <Column
            title={
              <div className="flex justify-center items-center">
                <p className="text-titleGray">Wrapped</p>
                <HtmlTooltip
                  arrow
                  placement="top"
                  title={
                    <>
                      <span className="flex justify-between items-center">
                        {`Create tokenization of your project token.`}
                      </span>
                    </>
                  }
                >
                  <img className="ml-1 w-3" src={InfoIcon} alt="info" />
                </HtmlTooltip>
              </div>
            }
            dataIndex="isWrapped"
            key="isWrapped"
            width={
              displayWidth < 1280 && displayWidth > 824
                ? `14%`
                : displayWidth < 825
                ? "100px"
                : `10%`
            }
            align="center"
            render={(text, row, index) => {
              return text ? (
                <div
                  onClick={(e) => {
                    toggleWrapped(e, index, text);
                  }}
                  className="w-3.5 h-3.5 border-success-color-350 bg-success-color-350 border-2 m-auto cursor-pointer flex justify-center items-center"
                >
                  <img
                    className="w-2.5 h-2.5"
                    src={CheckIcon}
                    alt="check icon"
                  />
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    toggleWrapped(e, index, text);
                  }}
                  className="w-3.5 h-3.5 border-success-color-350 border-2 m-auto cursor-pointer flex justify-center items-center"
                ></div>
              );
            }}
          />
        )}
        {
          <Column
            title={
              <div className="flex justify-center items-center">
                <p className="text-titleGray">Sellable</p>
                <HtmlTooltip
                  arrow
                  placement="top"
                  title={
                    <>
                      <span className="flex justify-between items-center">
                        {`Create tradable WVTs`}
                      </span>
                    </>
                  }
                >
                  <img className="ml-1 w-3" src={InfoIcon} alt="info" />
                </HtmlTooltip>
              </div>
            }
            dataIndex="isSellable"
            key="isSellable"
            width={
              displayWidth < 1280 && displayWidth > 824
                ? `14%`
                : displayWidth < 825
                ? "100px"
                : `10%`
            }
            align="center"
            render={(text, row, index) => {
              return text ? (
                <div
                  onClick={(e) => {
                    toggleSellable(e, index, text);
                  }}
                  className="w-3.5 h-3.5 border-success-color-350 bg-success-color-350 border-2 m-auto cursor-pointer flex justify-center items-center"
                >
                  <img
                    className="w-2.5 h-2.5"
                    src={CheckIcon}
                    alt="check icon"
                  />
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    toggleSellable(e, index, text);
                  }}
                  className="w-3.5 h-3.5 border-success-color-350 border-2 m-auto cursor-pointer flex justify-center items-center"
                ></div>
              );
            }}
          />
        }
      </Table>
      {/* </div>
      </div> */}
    </section>
  );
}

export default ReviewTableContainer;
