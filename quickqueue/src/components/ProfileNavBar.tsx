import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  })
);

export const ProfileNavBar: React.FunctionComponent<any> = (props) => {

  const classes = useStyles();
  const history = useHistory()

  const [menu, setMenu] = React.useState({
    isOpen: false,
  });

  const toggleDrawer = (isOpen: boolean) => (event: React.MouseEvent) => {
    if (event.type === "keydown") {
      return;
    }
    setMenu({ isOpen });
  };

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    text: string
  ) => {

    e.preventDefault();
    let clicked = text.toLowerCase()

    if (clicked === 'store') {

      history.push("/store");

    } else if (clicked === 'log out') {

      history.push("/login");

    }
  }

  const listMenuItems = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {["Store", "Log out"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText
              primary={text}
              onClick={(e) => handleClick(e, text)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={menu.isOpen} onClose={toggleDrawer(false)}>
          {listMenuItems()}
        </Drawer>
        <Typography variant="h6" className={classes.title}>
          Your QuickQueue Profile
        </Typography>
      </Toolbar>
    </AppBar>
  );
};