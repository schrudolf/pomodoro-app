import * as React from "react";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const marks = (function () {
  let getWorkTimers = [];
  for (let i = 1; i <= 24; i++) {
    if (i % 5 === 0 || i === 1 || i === 24) {
      getWorkTimers.push({
        value: i * 5,
        label: `${0 + i * 5}:00`,
      });
    }
  }
  return getWorkTimers;
})();

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: "lightgreen",
  height: 2,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "white",
    boxShadow: iOSBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: "white",
      fontSize: "1rem",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "white",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "black",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

const WorkSlider = () => {
  return (
    <div>
      <Typography
        sx={{ margin: "1rem 0 1.5rem -2.5rem", fontWeight: 600, width: "100%" }}
        gutterBottom
      >
        Work time:
      </Typography>
      <IOSSlider
        aria-label="ios slider"
        defaultValue={10}
        step={5}
        min={5}
        max={120}
        marks={marks}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `${value}:00 minutes`}
      />
      <Box sx={{ m: 3 }} />
    </div>
  );
};

export default WorkSlider;
