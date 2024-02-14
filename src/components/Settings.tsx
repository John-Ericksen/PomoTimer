import { useEffect, useState } from "react";
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
  };

  useEffect(() => {
    updateTimerValues();
    props.setTimerValues([
      (parseInt(workMinutes) || 0) * 1000 * 60,
      (parseInt(shortBreakMinutes) || 0) * 1000 * 60,
      (parseInt(longBreakMinutes) || 0) * 1000 * 60,
    ]); //needs a conversion to ms
  }, [workMinutes, shortBreakMinutes, longBreakMinutes]);

  return (
    <>
      <button className="settings" onClick={changeShowForm}>
        Settings
      </button>
      {showForm && (
        <form action="">
          <input
            onChange={updateTimerValues}
            value={workMinutes}
            id="work-minutes-input"
          ></input>
          <input
            onChange={updateTimerValues}
            value={shortBreakMinutes}
            id="short-break-minutes-input"
          ></input>
          <input
            onChange={updateTimerValues}
            value={longBreakMinutes}
            id="long-break-minutes-input"
          ></input>
        </form>
      )}
    </>
  );
}
