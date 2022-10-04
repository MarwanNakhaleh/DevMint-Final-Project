// taken from AppSeed Material UI template
import {
  AppBar,
  Typography,
  Link,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
} from "@mui/material";
import React from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StyledLogo, StyledToolBar, StyledLink, StyledMenuIcon } from "../styles/styles";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Header = (props) => {
  const links = [
    {
      id: 1,
      route: "How to use",
      url: "https://blog.appseed.us/mui-react-coding-landing-page/",
    },
    {
      id: 2,
      route: "ERC 20",
      url: "https://blog.appseed.us/mui-react-coding-landing-page/",
    },
    { id: 3, route: "ERC 721", url: "https://appseed.us/apps/react" },
    { id: 4, route: "ERC 1155", url: "https://appseed.us/apps/react" },
    { id: 5, route: "What's next?", url: "https://appseed.us/apps/react" }
  ];

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {links.map((link) => (
          <ListItem button key={link.id}>
            <ListItemText primary={link.route} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ marginBottom: "70px" }}>
      <ElevationScroll {...props}>
        <AppBar>
          <StyledToolBar>
            <Link href="#" underline="none">
              <StyledLogo>
                Business NFT Generator
              </StyledLogo>
            </Link>

            {matches ? (
              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer("right", true)}
                >
                  <StyledMenuIcon fontSize="" />
                </IconButton>

                <Drawer
                  anchor="right"
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  {list("right")}
                </Drawer>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexGrow: "0.1",
                }}
              >
                {links.map((link) => (
                  <Link
                    href={link.url}
                    target="_blank"
                    underline="none"
                    key={link.id}
                  >
                    <StyledLink>
                      {link.route}
                    </StyledLink>
                  </Link>
                ))}
              </Box>
            )}
          </StyledToolBar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;
