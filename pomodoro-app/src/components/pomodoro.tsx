import React from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import SettingsIcon from "@mui/icons-material/Settings";

import { AppSettings } from "../models/settings";

const Pomodoro = (props: { setSettingStatus: (value: Boolean) => void, settings: AppSettings }) => {
  const openSettings = () => {
    props.setSettingStatus(true);
  };
  return (
    <Box>
      <Link
        component="button"
        variant="body2"
        onClick={openSettings}
        title={"Settings"}
        sx={{ fontSize: "3rem", color: "white", float: "right" }}
      >
        <SettingsIcon sx={{ fontSize: "3rem", color: "white" }} />
      </Link>
      <div>
        <p>{props.settings.rounds}</p>
        <p>{props.settings.workTime}</p>
        <p>{props.settings.breakTime}</p>
        <p>{props.settings.longBreakTime}</p>
      </div>
    </Box>
  );
};

export default Pomodoro;
