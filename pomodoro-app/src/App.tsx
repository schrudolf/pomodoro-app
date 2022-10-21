import React, { useState } from "react";
import "./App.css";

import Settings from "./components/settings";
import Pomodoro from "./components/pomodoro";

function App() {
  const [isSettingsActive, setSettingStatus] = useState<Boolean>(false);
  const [settings, setSettings] = useState({
    rounds: 4,
    workTime: "2500",
    breakTime: 5,
    longBreakTime: 10,
  });

  if (isSettingsActive) {
    return <Settings setSettingStatus={setSettingStatus} settings={settings} setSettings={setSettings}/>;
  } else {
    return <Pomodoro setSettingStatus={setSettingStatus} settings={settings}/>;
  }
}

export default App;
