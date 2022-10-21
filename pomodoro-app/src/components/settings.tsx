import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import RoundsSlider from "./roundsSlider";
import WorkSlider from "./workSlider";
import BreakSlider from "./breakSlider";
import LongBreakSlider from "./longBreakSlider";

import { AppSettings } from "../models/settings";

interface settingsProp {
  setSettingStatus: (value: Boolean) => void;
  settings: AppSettings,
  setSettings: (value: AppSettings) => void;
}

function Settings({ setSettingStatus, settings ,setSettings}: settingsProp) {
  const saveSettings = () => {
    setSettingStatus(false);
  };
  return (
    <Box sx={{ width: "75%", margin: "auto" }}>
      <Typography
        fontWeight={"bold"}
        textAlign={"center"}
        variant="h4"
        component="h2"
      >
        Settings
      </Typography>
      <RoundsSlider settings={settings} setSettings={setSettings} />
      <WorkSlider settings={settings} setSettings={setSettings}/>
      <BreakSlider settings={settings} setSettings={setSettings} />
      <LongBreakSlider settings={settings} setSettings={setSettings} />
      <Button
        sx={{ width: "100%", fontWeight: 600 }}
        onClick={saveSettings}
        color="inherit"
        variant="contained"
      >
        Save settings
      </Button>
    </Box>
  );
}

export default Settings;
