import React from "react";
import {
  Pane,
  Tab,
  Button,
  Popover,
  TabNavigation,
  Menu,
  MenuIcon,
} from "evergreen-ui";
import "./NavBar.css";
import Logo from "../../assets/logo_color.png";

const NavBar = () => {
  return (
    <Pane className="navbar">
      <Pane className="navbar--left">
        <Pane className="navbar--logo-holder">
          <img src={Logo} alt="logo" className="navbar--logo" />
        </Pane>

        <Popover
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
          <Button
            className="nav-bar--dropdown"
            appearance="minimal"
            iconBefore={MenuIcon}
          >
          
          </Button>
        </Popover>
      </Pane>

        <TabNavigation>
          {["Home", "About"].map((tab, index) => (
            <Tab key={tab} is="a" href="#" id={tab} isSelected={index === 0}>
              {tab}
            </Tab>
          ))}
        </TabNavigation>
 
    </Pane>
  );
};

export default NavBar;
