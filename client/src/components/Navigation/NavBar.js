import React from "react";
import { Pane, Tab, Button, Popover, TabNavigation, Menu } from "evergreen-ui";

const NavBar = () => {
  return (
    <Pane padding={10}>
      <TabNavigation>
        <Popover
          // position={Position.BOTTOM_LEFT}
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
          <Button marginRight={16}>Without Icons</Button>
        </Popover>
        {["Traits", "Event History", "Identities"].map((tab, index) => (
          <Tab key={tab} is="a" href="#" id={tab} isSelected={index === 0}>
            {tab}
          </Tab>
        ))}
      </TabNavigation>
    </Pane>
  );
};

export default NavBar;
