import { useEffect, useState } from "react";
import "./Settings.scss";
export default function Settings(props: any) {
  const [showForm, setShowForm] = useState(false);

  function changeShowForm() {
    setShowForm((prevShowForm) => !prevShowForm);
  }

  const [workMinutes, setWorkMinutes] = useState(
    `${Math.floor((props.timerValues[0] / 1000 / 60) % 60)}`
  );

  const [shortBreakMinutes, setShortBreakMinutes] = useState(
    `${Math.floor((props.timerValues[1] / 1000 / 60) % 60)}`
  );

  const [longBreakMinutes, setLongBreakMinutes] = useState(
    `${Math.floor((props.timerValues[2] / 1000 / 60) % 60)}`
  );

  const updateTimerValues = () => {
    var workMinutesInput: HTMLInputElement;
    var shortBreakMinutesInput: HTMLInputElement;
    var longBreakMinutesInput: HTMLInputElement;
    var workCycles: HTMLInputElement;

    if (document.getElementById("work-minutes-input") as HTMLInputElement) {
      workMinutesInput = document.getElementById(
        "work-minutes-input"
      ) as HTMLInputElement;
      setWorkMinutes(workMinutesInput.value);
    }

    if (
      document.getElementById("short-break-minutes-input") as HTMLInputElement
    ) {
      shortBreakMinutesInput = document.getElementById(
        "short-break-minutes-input"
      ) as HTMLInputElement;
      setShortBreakMinutes(shortBreakMinutesInput.value);
    }

    if (
      document.getElementById("long-break-minutes-input") as HTMLInputElement
    ) {
      longBreakMinutesInput = document.getElementById(
        "long-break-minutes-input"
      ) as HTMLInputElement;
      setLongBreakMinutes(longBreakMinutesInput.value);
    }

    if (document.getElementById("break-count-input") as HTMLInputElement) {
      workCycles = document.getElementById(
        "break-count-input"
      ) as HTMLInputElement;
      props.setDefaultWorkCycles(workCycles.value);
    }
  };

  useEffect(() => {
    updateTimerValues();
    props.setTimerValues([
      (parseFloat(workMinutes) || 0) * 1000 * 60,
      (parseFloat(shortBreakMinutes) || 0) * 1000 * 60,
      (parseFloat(longBreakMinutes) || 0) * 1000 * 60,
    ]); //needs a conversion to ms
  }, [workMinutes, shortBreakMinutes, longBreakMinutes]);

  return (
    <>
      <button className="settings-button" onClick={changeShowForm} />
      {showForm && (
        <form className="settings-form" action="">
          <button className="close-settings" onClick={changeShowForm}></button>
          <label htmlFor="work-minutes-input">Work Timer</label>
          <input
            type="number"
            onChange={updateTimerValues}
            value={workMinutes}
            id="work-minutes-input"
          ></input>
          <label htmlFor="short-break-minutes-input">Short Break</label>
          <input
            type="number"
            onChange={updateTimerValues}
            value={shortBreakMinutes}
            id="short-break-minutes-input"
          ></input>
          <label htmlFor="long-break-minutes-input">Long Break</label>
          <input
            type="number"
            onChange={updateTimerValues}
            value={longBreakMinutes}
            id="long-break-minutes-input"
          ></input>
          <label htmlFor="break-count-input">Work Cycles</label>
          <input
            type="number"
            onChange={updateTimerValues}
            value={props.defaultWorkCycles}
            id="break-count-input"
          ></input>
        </form>
      )}
    </>
  );
}
