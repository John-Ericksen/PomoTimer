import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const TIME_IN_MILISECONDS_TO_COUNTDOWN = 1500 * 1000; //1500 for 25 minutes
const INTERVAL_IN_MILISECONDS = 100;

export default function PomodoroTimer() {
  // const [timerInSeconds, setTimerInSeconds] = React.useState(1500); //25 minutes in seconds
  // const [seconds, setSeconds] = React.useState(Math.floor((timerInSeconds % 60)));
  // const [minutes, setMinutes] = React.useState(Math.floor((timerInSeconds / 60) % 60));

  // const [minutesString, setMinutesString] = React.useState(minutes < 10 ? `0${minutes}`: `${minutes}`);
  // const [SecondsString, setSecondsString] = React.useState(seconds < 10 ? `0${seconds}`: `${seconds}`);

  // const [timer, setTimer] = React.useState(`${minutesString}:${SecondsString}`);

  // var start = new Date().getTime();
  // const [elapsed, setElapsed] = React.useState(0.0);

  // window.setInterval(function() {
  //     var time = new Date().getTime() - start;

  //     setElapsed(prevElapsed => (prevElapsed + Math.floor(time / 100) / 10));
  //     if(elapsed > 1) {
  //         setTimerInSeconds(prevTimer => prevTimer - 1);

  //         setSeconds(Math.floor((timerInSeconds % 60)));
  //         setMinutes(Math.floor((timerInSeconds / 60) % 60));

  //         setMinutesString(minutes < 10 ? `0${minutes}`: `${minutes}`);
  //         setSecondsString(seconds < 10 ? `0${seconds}`: `${seconds}`);

  //         setTimer(`${minutesString}:${SecondsString}`);
  //         setElapsed(0.0);
  //         console.log(timerInSeconds);
  //     }

  // }, 1000);

  // return(
  //     <div className="timer">
  //         <p>{timer}</p>
  //     </div>
  // );

  const [time, setTime] = useState(TIME_IN_MILISECONDS_TO_COUNTDOWN);
  const [referenceTime, setReferenceTime] = useState(Date.now());
  /* parses the time in seconds from the time in milleseconds,
 converts it to a string and adds a leading zero if neccessary. */

  const [secondsString, setSecondsString] = useState(
    Math.floor((time / 1000) % 60) < 10
      ? `0${Math.floor((time / 1000) % 60)}`
      : `${Math.floor((time / 1000) % 60)}`
  );
  /* parses the time in milliseconds into minutes, converts to a 
  string, and adds a leading 0 if the minutes remaining is less than 
  10 (for styling). could probably be broken up into multiple lines 
  for clarity, but then would require more useState calls, 
  which may impact performance, so calculations are done inline. */

  const [minutesString, setMinutesString] = useState(
    Math.floor((time / 1000 / 60) % 60) < 10
      ? `0${Math.floor((time / 1000 / 60) % 60)}`
      : `${Math.floor((time / 1000 / 60) % 60)}`
  );

  useEffect(() => {
    const countDownUntilZero = () => {
      setTime((prevTime) => {
        if (prevTime <= 0) return 0;

        const now = Date.now();
        const interval = now - referenceTime;
        setReferenceTime(now);
        return prevTime - interval;
      });
    };

    setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
    setSecondsString(
      Math.floor((time / 1000) % 60) < 10
        ? `0${Math.floor((time / 1000) % 60)}`
        : `${Math.floor((time / 1000) % 60)}`
    );

    //uses the same logic as the declaration of the variable to parse minutes.
    setMinutesString(
      Math.floor((time / 1000 / 60) % 60) < 10
        ? `0${Math.floor((time / 1000 / 60) % 60)}`
        : `${Math.floor((time / 1000 / 60) % 60)}`
    );
  }, [time]);

  return <>{`${minutesString}:${secondsString}`}</>;
}
