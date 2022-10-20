import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import SettingsIcon from "@mui/icons-material/Settings";
import CircleProgress from "./circleProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { AppSettings } from "../models/settings";

const Pomodoro = (props: {
  setSettingStatus: (value: Boolean) => void;
  settings: AppSettings;
}) => {
  const openSettings = () => {
    props.setSettingStatus(true);
  };
  return (
    <Container>
      <Box>
        {/* <div>
          <p>{props.settings.rounds}</p>
          <p>{props.settings.workTime}</p>
          <p>{props.settings.breakTime}</p>
          <p>{props.settings.longBreakTime}</p>
        </div> */}
      </Box>
      <Box textAlign={"center"} mt={5}>
        <CircleProgress />
      </Box>
      <Box textAlign={"center"} my={3}>
        <Typography variant="h2" color="text.secondary">
          {`25:00`}
        </Typography>
      </Box>
      <Box textAlign={"center"}>
        <Button variant="contained" sx={{ width: "30%", margin: "0.3rem" }}>
          Start
        </Button>
        <Button variant="contained" sx={{ width: "30%", margin: "0.3rem" }}>
          Reset
        </Button>
      </Box>
      <Box textAlign={"center"}>
        <Link
          component="button"
          variant="body2"
          onClick={openSettings}
          title={"Settings"}
          sx={{ fontSize: "3rem", color: "white", textDecoration: "none", }}
        >
          <SettingsIcon sx={{ fontSize: "1rem", color: "white", marginRight: "4px" }} />
          <Typography fontSize={20} display={"inline"} alignContent={"center"} >Settings
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default Pomodoro;
