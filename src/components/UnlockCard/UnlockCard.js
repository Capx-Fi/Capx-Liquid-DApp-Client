import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import { convertToInternationalCurrencySystem } from "../../utils/convertToInternationalCurrencySystem";

function UnlockCard({ unlock, projectOverview }) {
  //timer

  const Ref = useRef(null);
  const [timer, setTimer] = useState({
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor(total / (1000 * 3600 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, days, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer({
        days: days,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      });
    }
  };

  const clearTimer = (e) => {
    setTimer({
      days: 0,
      hours: "00",
      minutes: "00",
      seconds: "00",
    });
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date(unlock?.date);
    deadline.setSeconds(deadline.getSeconds());
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <div>
      {" "}
      <Popup
        on={"hover"}
        arrow={false}
        offsetX={14}
        offsetY={-10}
        trigger={
          <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection_minidetailcard">
            <p className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection_minidetailcard_title">
              Unlock
            </p>
            <div className="flex flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-green-400 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <p>
                {convertToInternationalCurrencySystem(unlock?.numOfTokens)}{" "}
                {projectOverview?.details?.projectTokenTicker}
              </p>
              <p className="investedprojectdetails_maincontainer_innercontainer_detailsection_leftdiv_minidetailsection_minidetailcard_value">
                {unlock?.displayDate}
              </p>
            </div>
          </div>
        }
        position="right top"
      >
        <div className="border-2 border-primary-green-300 bg-white rounded-lg shadow-md p-5">
          <p className="font-light text-sm mb-2">Unlocks in</p>
          <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer">
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
              <div className="font-extrabold">{timer.days}</div>
              <div className="font-normal">days</div>
            </div>
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
              <div className="font-extrabold">{timer.hours}</div>
              <div className="font-normal">hours</div>
            </div>
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
              <div className="font-extrabold">{timer.minutes}</div>
              <div className="font-normal">min</div>
            </div>
            <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer_timercard">
              <div className="font-extrabold">{timer.seconds}</div>
              <div className="font-normal">sec</div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default UnlockCard;
