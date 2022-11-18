import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RoundsSlider from "./roundsSlider";
import WorkSlider from "./workSlider";
import BreakSlider from "./breakSlider";
import LongBreakSlider from "./longBreakSlider";

import { AppSettings } from "../models/settings";

interface settingsProp {
  setSettingStatus: React.Dispatch<React.SetStateAction<Boolean>>;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

function Settings({ setSettingStatus, settings, setSettings }: settingsProp) {
  const saveSettings = () => {
    setSettingStatus(false);
  };
  return (
    <Box pt={5} className="settingsBox">
      <RoundsSlider settings={settings} setSettings={setSettings} />
      <WorkSlider settings={settings} setSettings={setSettings} />
      <BreakSlider settings={settings} setSettings={setSettings} />
      <LongBreakSlider settings={settings} setSettings={setSettings} />
      <Button
        onClick={saveSettings}
        color="inherit"
        variant="contained"
        className="saveSettingsButton"
      >
        Save settings
      </Button>
    </Box>
  );
}

export default Settings;
