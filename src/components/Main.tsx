import Timer from "./Timer";
import WorkButton from "./ButtonRow";
import { useEffect, useState } from "react";

export default function Main() {
  const [currentTimerState, setCurrentTimerState] = useState("work");
  const [timerValues, setTimerValues] = useState([1500, 300, 900]);
  const [timeToCountdown, setTimeToCountdown] = useState(timerValues[1]);

  useEffect(() => {
    if (currentTimerState == "work") {
      setTimeToCountdown(timerValues[0]);
    } else if (currentTimerState == "shortbreak") {
      setTimeToCountdown(timerValues[1]);
    } else if (currentTimerState == "longbreak") {
      setTimeToCountdown(timerValues[2]);
    }
  }, [currentTimerState]);

  function updateCurrentState(newState: string) {
    setCurrentTimerState(newState);
  }

  return (
    <>
      <WorkButton />
      <Timer timeToCountdown={timeToCountdown} />
    </>
  );
}
