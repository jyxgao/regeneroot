import React from "react";
import {
  Pane,
  Tab,
  Button,
  Popover,
  TabNavigation,
  Menu,
  MenuIcon,
  IconButton,
  Avatar,
} from "evergreen-ui";
import { Redirect, Link } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../assets/logo_color.png";

const NavBar = (props) => {
  console.log(props);
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      padding={10}
      paddingLeft={50}
      paddingRight={50}
      zIndex={1}
      overflow="hidden"
      position="fixed"
      borderBottom="muted"
      backgroundColor="#FFFFFF"
      width="100%"
    >
      <Pane className="navbar--left" display="flex">
        <Pane>
          <Link to="/">
            <img src={Logo} alt="logo" height={50} />
          </Link>
        </Pane>
        <Pane display="flex" paddingLeft={12} paddingTop={8}>
          <Popover
            trigger="hover"
            content={
              <Menu>
                <Menu.Group>
                  <Menu.Item
                  // onSelect={() => toaster.notify("Share")}
                  >
                    Share...
                  </Menu.Item>
                  <Menu.Item
                  // onSelect={() => toaster.notify("Move")}
                  >
                    Move...
                  </Menu.Item>
                  <Menu.Item
                    // onSelect={() => toaster.notify("Rename")}
                    secondaryText="⌘R"
                  >
                    Rename...
                  </Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                  <Menu.Item
                    // onSelect={() => toaster.danger("Delete")}
                    intent="danger"
                  >
                    Delete...
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          >
            <IconButton
              className="nav-bar--dropdown"
              appearance="minimal"
              iconSize={20}
              icon={MenuIcon}
            ></IconButton>
          </Popover>
        </Pane>
        <Pane paddingTop={3}>
          <TabNavigation paddingLeft={12} paddingTop={7}>
            <Tab
              fontSize={16}
              fontFamily="Poppins"
              fontcolor="#2EC4B6"
              key="home"
              is="a"
              href="/"
              id="home"
            >
              Home
            </Tab>
            <Tab
              fontSize={16}
              fontFamily="Poppins"
              fontcolor="#2EC4B6"
              key="explore"
              is="a"
              href="/"
              id="explore"
            >
              Explore
            </Tab>
            {/* {["Home", "About"].map((tab, index) => (
              <Tab fontSize={16} fontFamily="Poppins" fontColor="#D81159" key={tab} is="a" href="#" id={tab} isSelected={index === 0}>
                {tab}
              </Tab>
            ))} */}
          </TabNavigation>
        </Pane>
      </Pane>
      <TabNavigation display="flex">
        <Popover
          trigger="hover"
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item
                // onSelect={() => toaster.notify("Share")}
                >
                  Share...
                </Menu.Item>
                <Menu.Item
                // onSelect={() => toaster.notify("Move")}
                >
                  Move...
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <Avatar size={40} src={props.user.avatar}></Avatar>
        </Popover>
        {props.user.first_name}
      </TabNavigation>
    </Pane>
  );
};

export default NavBar;
