import { useEffect } from "react";
import { useState } from "react";

const INTERVAL_IN_MILISECONDS = 100;

export default function Timer(props: any) {
  const timerValues = [
    props.timerValues[0],
    props.timerValues[1],
    props.timerValues[2],
  ];
  const [time, setTime] = useState(timerValues[0]);
  const [referenceTime, setReferenceTime] = useState(Date.now());
  const [isCountingDown, setIsCountingDown] = useState(false);

  // resets reference time so that the next tick only counts 1 second
  function toggleIsCountingDown() {
    setIsCountingDown((prevIsCounting) => !prevIsCounting);
    setReferenceTime(Date.now());
  }

  function updateTimerText() {
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
  }

  useEffect(updateTimerText, [time]);

  function shortBreak() {
    setIsCountingDown(false);
    setReferenceTime(Date.now());
    setTime(props.timerValues[1]);
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
  10 (for styling). could probably be broken up into multiple lines 
  for clarity, but then would require more useState calls, 
  which may impact performance, so calculations are done inline. */

  const [minutesString, setMinutesString] = useState(
    Math.floor((time / 1000 / 60) % 60) < 10
      ? `0${Math.floor((time / 1000 / 60) % 60)}`
      : `${Math.floor((time / 1000 / 60) % 60)}`
  );

  useEffect(() => {
    if (isCountingDown) {
      function countDownUntilZero() {
        setTime((prevTime: number) => {
          if (prevTime <= 0) return 0;

          const now = Date.now();
          const interval = now - referenceTime;
          setReferenceTime(now);
          return prevTime - interval;
        });
      }
      updateTimerText();
      setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
    }
  }, [time, isCountingDown]);

  //--------------------------

  return (
    <div>
      <button onClick={shortBreak}>Short Break</button>
      <p>{`${minutesString}:${secondsString}`}</p>
      <button onClick={toggleIsCountingDown}>
        {isCountingDown ? "Pause Timer" : "Start Timer"}
      </button>
    </div>
  );
}
