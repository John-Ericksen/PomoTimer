import { useEffect } from "react";
import { useState } from "react";
import Settings from "../Settings/Settings";
import "./Timer.scss";
import alarm from "../../assets/alarm.mp3";
import { Button } from "@mui/joy";

export default function Timer(props: any) {
  const INTERVAL_IN_MILISECONDS = 100;
  const alarmSound = new Audio(alarm);

  if (!window.Notification) {
    alert("Browser does not support notifications.");
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  if (Notification.permission === "denied") {
    alert("Timer will not function optimally without notificaiton");
  }

  const [cyclesCount, setCyclesCount] = useState(props.defaultWorkCycles);
  useEffect(() => {
    setCyclesCount(props.defaultWorkCycles);
  }, [props.defaultWorkCycles]);

  const [time, setTime] = useState(props.timerValues[0]);
  const [referenceTime, setReferenceTime] = useState(Date.now());
  const [isCountingDown, setIsCountingDown] = useState(false);

  function toggleIsCountingDown() {
    setIsCountingDown((prevIsCounting) => !prevIsCounting);
    setReferenceTime(Date.now());
  }

  const [secondsString, setSecondsString] = useState(
    Math.floor((time / 1000) % 60) < 10
      ? `0${Math.floor((time / 1000) % 60)}`
      : `${Math.floor((time / 1000) % 60)}`
  );

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
    props.setCurrentMode("work");
  }

  function shortBreak() {
    setIsCountingDown(false);
    setTime(props.timerValues[1]);
    setReferenceTime(Date.now());
    setTimerTextToDefault(1);
    props.setCurrentMode("short-break");
  }

  function longBreak() {
    setIsCountingDown(false);
    setTime(props.timerValues[2]);
    setReferenceTime(Date.now());
    setTimerTextToDefault(2);
    props.setCurrentMode("long-break");
  }

  //changes the appropriate values when currentMode is switched
  useEffect(() => {
    if (props.currentMode === "work") {
      setTimerTextToDefault(0);
      setTime(props.timerValues[0]);
      setReferenceTime(Date.now());
    }
  }, [props.timerValues[0], props.currentMode]);

  useEffect(() => {
    if (props.currentMode === "short-break") {
      setTimerTextToDefault(1);
      setTime(props.timerValues[1]);
      setReferenceTime(Date.now());
    }
  }, [props.timerValues[1], props.currentMode]);

  useEffect(() => {
    if (props.currentMode === "long-break") {
      setTimerTextToDefault(2);
      setTime(props.timerValues[2]);
      setReferenceTime(Date.now());
    }
  }, [props.timerValues[2], props.currentMode]);

  //skips the current timer, advancing to the next
  function nextMode() {
    switch (props.currentMode) {
      case "work":
        if (cyclesCount > 0) {
          setCyclesCount((prevCyclesCount: any) => prevCyclesCount - 1);
          props.setCurrentMode("short-break");
          new Notification("Time's up! Take a short break!");
        } else {
          props.setCurrentMode("long-break");
          new Notification("Time's up! Take a long break!");
          setCyclesCount(props.defaultWorkCycles);
        }
        if (isCountingDown === true) {
          toggleIsCountingDown();
        }
        break;
      case "short-break":
      case "long-break":
        props.setCurrentMode("work");
        if (isCountingDown === true) {
          toggleIsCountingDown();
        }
        new Notification("Time's up! Back to work!");
        break;
    }
    alarmSound.play();
  }

  //count down current timer untill zero
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
        nextMode();
      }
      updateTimerText();
      setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
    }
  }, [time, isCountingDown]);

  //--------------------------

  return (
    <div className="timer">
      <div className="top-row">
        <Button
          className={
            props.currentMode === "work" ? "button-work" : "button-break"
          }
          onClick={workTimer}
        >
          Work Timer
        </Button>
        <Button
          className={
            props.currentMode === "work" ? "button-work" : "button-break"
          }
          onClick={shortBreak}
        >
          Short Break
        </Button>
        <Button
          className={
            props.currentMode === "work" ? "button-work" : "button-break"
          }
          onClick={longBreak}
        >
          Long Break
        </Button>
      </div>

      <p>{`${minutesString}:${secondsString}`}</p>

      <div className="bottom-row">
        <Settings
          setTimerValues={props.setTimerValues}
          timerValues={props.timerValues}
          defaultWorkCycles={props.defaultWorkCycles}
          setDefaultWorkCycles={props.setDefaultWorkCycles}
        />
        <Button
          className={
            isCountingDown ? "pause-button" : "play-button"
          }
          onClick={toggleIsCountingDown}
          sx={{backgroundColor: "transparent"}}
        >
          {isCountingDown ? "Pause" : "Start"}
        </Button>
        <Button onClick={nextMode} sx={{backgroundColor: "transparent"}} className="skip"></Button>
      </div>
    </div>
  );
}
