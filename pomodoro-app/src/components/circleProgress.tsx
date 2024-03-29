import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import WeekendIcon from "@mui/icons-material/Weekend";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import { AppSettings } from "../models/settings";

function getCurrentIcon(stateValue: number): JSX.Element {
  if (stateValue === 0) {
    return <FitnessCenterIcon fontSize="large" />;
  } else if (stateValue === 1) {
    return <SelfImprovementIcon fontSize="large" />;
  } else if (stateValue === 2) {
    return <WeekendIcon fontSize="large" />;
  } else {
    return <DoneIcon fontSize="large" />;
  }
}
function getCurrentState(stateValue: number): string {
  if (stateValue === 0) {
    return "Work";
  } else if (stateValue === 1) {
    return "Break";
  } else if (stateValue === 2) {
    return "Long break";
  } else {
    return "Jobs done!";
  }
}

function CircularProgressWithLabel(props: any): JSX.Element {
  return (
    <Box sx={{ position: "relative", display: "inline-flex", marginTop: "1.5rem" }}>
      <CircularProgress
        color="primary"
        size={300}
        className="circleProgress"
        variant="determinate"
        {...props}
      />
      <Box className="circleProgressInside">
        <Typography variant="h5" mt={3} fontWeight={"bold"} maxWidth={"60%"}>
          {getCurrentState(props.status)}
          <div>
            <Typography
              variant="h2"
              fontWeight={"bold"}
              className="progressCirclePercent"
            >
              {props.status < 3 && `${Math.round(props.value)}%`}
            </Typography>
          </div>
          <p style={{ marginBottom: 5, padding: 0 }}>
            {getCurrentIcon(props.status)}
          </p>
        </Typography>
      </Box>
    </Box>
  );
}

const CircleProgress = (props: { settings: AppSettings }) => {
  return (
    <CircularProgressWithLabel
      value={props.settings.percent}
      status={props.settings.status}
    />
  );
};

export default CircleProgress;
