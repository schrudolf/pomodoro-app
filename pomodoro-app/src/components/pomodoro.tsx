import React from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import SettingsIcon from "@mui/icons-material/Settings";

const Pomodoro = (props: { setSettingStatus: (value: Boolean) => void }) => {
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
    </Box>
  );
};

export default Pomodoro;
