import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import RoundsSlider from "./roundsSlider";
import WorkSlider from "./workSlider";
import BreakSlider from "./breakSlider";
import LongBreakSlider from "./longBreakSlider";


function Settings( props: { setSettingStatus: (value: Boolean) => void }  ) {
  const saveSettings = () => {
    props.setSettingStatus(false);
  }  
  return (
      <Box>
        <RoundsSlider />
        <WorkSlider />
        <BreakSlider />
        <LongBreakSlider />
        <Button sx={{width: "100%", fontWeight: 600}} onClick={saveSettings} color="inherit" variant="contained">Save settings</Button>
      </Box>
  );
}

export default Settings;
