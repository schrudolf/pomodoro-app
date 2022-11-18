import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import { getVersion } from "@tauri-apps/api/app";

const Footer = () => {
  const [version, setVersion] = useState("");
  const getAppVersion = async () => {
    const version = await getVersion();
    setVersion(version);
  };
  useEffect(() => {
    getAppVersion();
  }, []);
  return (
    <Box>
      <Grid className="footerMain" container spacing={2}>
        <Grid textAlign={"left"} className="footerTitle" item xs={6}>
          Version: {version}
        </Grid>
        <Grid textAlign={"right"} className="footerTitle" item xs={6}>
          <Link className="footerLink" href="https://github.com/schrudolf" target={"_blank"}>
            <Grid container>
              <Grid item xs={11}>
                <Typography mx={1}>schRudolf</Typography>
              </Grid>
              <Grid textAlign={"right"} item xs={1}>
                <GitHubIcon fontSize="small"></GitHubIcon>
              </Grid>
            </Grid>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
