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
  setSettings: (value: AppSettings) => void;
}

function Settings({ setSettingStatus, setSettings }: settingsProp) {
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
      ;
      <RoundsSlider setSettings={setSettings} />
      <WorkSlider setSettings={setSettings} />
      <BreakSlider />
      <LongBreakSlider />
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
