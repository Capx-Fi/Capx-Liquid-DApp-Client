import React, { useEffect, useRef, useState } from "react";

function Timer({ date }) {
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
    let deadline = date ? new Date(date) : new Date();
    deadline.setSeconds(deadline.getSeconds());
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  return (
    <div className="investedprojectdetails_maincontainer_innercontainer_detailsection_rightdiv_timer px-10 py-4">
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
  );
}

export default Timer;
