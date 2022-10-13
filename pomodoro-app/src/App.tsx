import React, {useState} from "react";
import "./App.css";

import Settings from "./components/settings";
import Pomodoro from "./components/pomodoro";

function App() {
  const [isSettingsActive, setSettingStatus] = useState<Boolean>(false);
  if(isSettingsActive){
    return <Settings setSettingStatus={setSettingStatus} />;
  } else {
    return <Pomodoro setSettingStatus={setSettingStatus} />;
  }
}

export default App;
