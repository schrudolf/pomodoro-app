import React, { useState } from "react";
import "./App.css";

import Settings from "./components/settings";
import Pomodoro from "./components/pomodoro";

import { AppSettings } from "./models/settings";

function App() {
  const [isSettingsActive, setSettingStatus] = useState<Boolean>(false);
  const [settings, setSettings] = useState<AppSettings>({
    rounds: 4,
    workTime: 25,
    breakTime: 5,
    longBreakTime: 10,
  });

  if (isSettingsActive) {
    return <Settings setSettingStatus={setSettingStatus} setSettings={setSettings}/>;
  } else {
    return <Pomodoro setSettingStatus={setSettingStatus} settings={settings}/>;
  }
}

export default App;
