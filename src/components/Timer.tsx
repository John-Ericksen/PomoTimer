import { useEffect } from "react";
import { useState } from "react";

const INTERVAL_IN_MILISECONDS = 100;

export default function Timer(props: any) {
  const [currentMode, setCurrentMode] = useState("work");
  const timerValues = [
    props.timerValues[0],
    props.timerValues[1],
    props.timerValues[2],
  ];

  const [cyclesCount, setCyclesCount] = useState(props.defaultWorkCycles);
  useEffect(()=>{
    setCyclesCount(props.defaultWorkCycles);
  }, [props.defaultWorkCycles]);

  const [time, setTime] = useState(timerValues[0]);
  const [referenceTime, setReferenceTime] = useState(Date.now());
  const [isCountingDown, setIsCountingDown] = useState(false);

  function toggleIsCountingDown() {
    setIsCountingDown((prevIsCounting) => !prevIsCounting);
    setReferenceTime(Date.now());
  }

  /* parses the time in seconds from the time in milleseconds,
 converts it to a string and adds a leading zero if neccessary. */
  const [secondsString, setSecondsString] = useState(
    Math.floor((time / 1000) % 60) < 10
      ? `0${Math.floor((time / 1000) % 60)}`
      : `${Math.floor((time / 1000) % 60)}`
  );

  /* parses the time in milliseconds into minutes, converts to a 
  string, and adds a leading 0 if the minutes remaining is less than 
  10 (for styling). */
  const [minutesString, setMinutesString] = useState(
    Math.floor((time / 1000 / 60) % 60) < 10
      ? `0${Math.floor((time / 1000 / 60) % 60)}`
      : `${Math.floor((time / 1000 / 60) % 60)}`
  );

  function updateTimerText() {
    setSecondsString(
      Math.floor((time / 1000) % 60) < 10
        ? `0${Math.floor((time / 1000) % 60)}`
        : `${Math.floor((time / 1000) % 60)}`
    );

    //uses the same logic as the declaration of the variable to parse minutes.
    setMinutesString(
      Math.floor(time / 60000) < 10
        ? `0${Math.floor(time / 60000)}`
        : `${Math.floor(time / 60000)}`
    );
  }

  /*sets the timer text to one of the three default values 
  for work timer, short break, or long break, depending 
  on the int passed */
  function setTimerTextToDefault(value: number) {
    setSecondsString(
      Math.floor((props.timerValues[value] / 1000) % 60) < 10
        ? `0${Math.floor((props.timerValues[value] / 1000) % 60)}`
        : `${Math.floor((props.timerValues[value] / 1000) % 60)}`
    );
    setMinutesString(
      Math.floor(props.timerValues[value] / 60000) < 10
        ? `0${Math.floor(props.timerValues[value] / 60000)}`
        : `${Math.floor(props.timerValues[value] / 60000)}`
    );
  }

  function workTimer() {
    setIsCountingDown(false);
    setTime(props.timerValues[0]);
    setReferenceTime(Date.now());
    setTimerTextToDefault(0);
    setCurrentMode("work");
  }

  function shortBreak() {
    setIsCountingDown(false);
    setTime(props.timerValues[1]);
    setReferenceTime(Date.now());
    setTimerTextToDefault(1);
    setCurrentMode("short-break");
  }

  function longBreak() {
    setIsCountingDown(false);
    setTime(props.timerValues[2]);
    setReferenceTime(Date.now());
    setTimerTextToDefault(2);
    setCurrentMode("long-break");
  }

  //for settings updates to work timer, and when long/short break is over
  useEffect(() => {
    if (currentMode === "work") {
      setTimerTextToDefault(0);
      setTime(props.timerValues[0]);
      setReferenceTime(Date.now());
    }
  }, [props.timerValues[0], currentMode]);

  //for settings updates to short break timer and when work is over
  useEffect(() => {
    if (currentMode === "short-break") {
      setTimerTextToDefault(1);
      setTime(props.timerValues[1]);
      setReferenceTime(Date.now());
    }
  }, [props.timerValues[1], currentMode]);

  //for settings updates to long break timer and when work is over
  useEffect(() => {
    if (currentMode === "long-break") {
      setTimerTextToDefault(2);
      setTime(props.timerValues[2]);
      setReferenceTime(Date.now());
    }
  }, [props.timerValues[2], currentMode]);

  useEffect(() => {
    if (isCountingDown) {
      function countDownUntilZero() {
        if (isCountingDown) {
          setTime((prevTime: number) => {
            if (prevTime <= 0) return 0;

            const now = Date.now();
            const interval = now - referenceTime;
            setReferenceTime(now);
            return prevTime - interval;
          });
        }
      }
      if (time <= 500) {
        switch (currentMode) {
          case "work":
            if (cyclesCount > 0) {
              setCyclesCount((prevCyclesCount: any) => prevCyclesCount - 1);
              setCurrentMode("short-break");
            } 
            else {
              setCurrentMode("long-break");
              setCyclesCount(props.defaultWorkCycles);
            }
            toggleIsCountingDown();
            break;
          case "short-break":
            setCurrentMode("work");
            toggleIsCountingDown();
            break;
          case "long-break":
            setCurrentMode("work");
            toggleIsCountingDown();
            break;
        }
      }
      updateTimerText();
      setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
    }
  }, [time, isCountingDown]);

  //--------------------------

  return (
    <div>
      <button onClick={workTimer}>Work Timer</button>
      <button onClick={shortBreak}>Short Break</button>
      <button onClick={longBreak}>Long Break</button>

      <p>{`${minutesString}:${secondsString}`}</p>
      <button onClick={toggleIsCountingDown}>
        {isCountingDown ? "Pause Timer" : "Start Timer"}
      </button>
    </div>
  );
}
