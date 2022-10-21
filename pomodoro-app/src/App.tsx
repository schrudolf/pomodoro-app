import React, { useState, useEffect } from "react";
import localforage from "localforage";
import "./App.css";

import Settings from "./components/settings";
import Pomodoro from "./components/pomodoro";
import createLocalDB from "./service/createLocalDB";

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSettingsActive, setSettingStatus] = useState<Boolean>(false);
  const [settings, setSettings] = useState({
    rounds: 0,
    workTime: "0",
    breakTime: 0,
    longBreakTime: 0,
    status: 0,
  });

  useEffect(() => {
    localforage.getItem("status", (err, value) => {
      if (err) throw err;
      if (value === null) {
        createLocalDB();
        setIsAppReady(true);
      } else {
        const loadValues = async () => {
          try {
            const roundsValue = await localforage.getItem("rounds");
            const workTimeValue = await localforage.getItem("workTime");
            const breakTimeValue = await localforage.getItem("breakTime");
            const longBreakTimeValue = await localforage.getItem(
              "longBreakTime"
            );
            const statusValue = await localforage.getItem("status");
            setSettings((prevState: any) => ({
              ...prevState,
              breakTime: breakTimeValue,
              longBreakTime: longBreakTimeValue,
              rounds: roundsValue,
              workTime: workTimeValue,
              status: statusValue,
            }));
            setIsAppReady(true);
          } catch (err) {
            console.log(err);
          }
        };
        loadValues();
      }
    });
  }, []);

  if (isSettingsActive && isAppReady) {
    return (
      <Settings
        setSettingStatus={setSettingStatus}
        settings={settings}
        setSettings={setSettings}
      />
    );
  } else if (!isSettingsActive && isAppReady) {
    return (
      <Pomodoro
        setSettingStatus={setSettingStatus}
        settings={settings}
        setSettings={setSettings}
      />
    );
  } else {
    return <h1>Loading..</h1>;
  }
}

export default App;
