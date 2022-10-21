import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props: any) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        color="primary"
        size={300}
        sx={{boxShadow: "inset 0px 0px 0px 25px black", borderRadius: "100%"}}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">
          Work
          <div>
            <Typography variant="h2" color="text.secondary">
              {`${Math.round(props.value)}%`}
            </Typography>
          </div>
        </Typography>
      </Box>
    </Box>
  );
}

const CircleProgress = (props: { settings: any }) => {
  return <CircularProgressWithLabel value={props.settings.percent} />;
};

export default CircleProgress;
