import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode
}

const Header = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 2, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ヘッダー
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const Body = (props: Props) => {
  return (
    <Box maxWidth="lg" sx={{ m: 4 }}>
      {props.children}
    </Box>
  );
};

const Layout = (props: Props) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" component="main" sx={{ width: "100%" }}>
      <Header />
      <Body>{props.children}</Body>
    </Box>
  );
};

export default Layout;
