import React, { useState, useEffect } from "react";
import localforage from "localforage";
import "./App.css";

import Settings from "./components/settings";
import Pomodoro from "./components/pomodoro";
import createLocalDB from "./service/createLocalDB";
import { AppSettings } from "./models/settings";

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isSettingsActive, setSettingStatus] = useState<Boolean>(false);
  const [settings, setSettings] = useState<AppSettings>({
    rounds: 0,
    breakTime: "300",
    workTime: "0",
    longBreakTime: "1800",
    status: 0,
    percent: 0,
    selectedRounds: 4,
    selectedBreakTime: "300",
    selectedWorkTime: "1500",
    selectedLongBreakTime: "1800",
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
            const percentValue = await localforage.getItem("percent");
            const selectedRoundsValue = await localforage.getItem(
              "selectedRounds"
            );
            const selectedBreakTimeValue = await localforage.getItem(
              "selectedBreakTime"
            );
            const selectedWorkTimeValue = await localforage.getItem(
              "selectedWorkTime"
            );
            const selectedLongBreakTimeValue = await localforage.getItem(
              "selectedLongBreakTime"
            );
            setSettings((prevState: AppSettings) => ({
              ...prevState,
              breakTime: breakTimeValue as string,
              longBreakTime: longBreakTimeValue as string,
              rounds: roundsValue as number,
              workTime: workTimeValue as string,
              status: statusValue as number,
              percent: percentValue as number,
              selectedRounds: selectedRoundsValue as number,
              selectedBreakTime: selectedBreakTimeValue as string,
              selectedWorkTime: selectedWorkTimeValue as string,
              selectedLongBreakTime: selectedLongBreakTimeValue as string,
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
