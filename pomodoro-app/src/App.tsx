import React, {useState} from "react";
import "./App.css";

import Box from "@mui/material/Box";
import Settings from "./components/settings";

function App() {
  const [isSettingsActive, setSettingStatus] = useState<Boolean>(true);
  return (
      <Box sx={{ width: "75%", margin: "auto" }}>
        {isSettingsActive ? <Settings setSettingStatus={setSettingStatus}/> : "Settings not active"}
      </Box>
  );
}

export default App;
