import React from "react";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../../store/sideBar";
import { SideBarItems } from "./SideBarItems";

function SideBar() {
  const { open } = useSelector((state) => state.sideBar);
  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    !open && dispatch(closeSideBar());
  };

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
          <SideBarItems />
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default SideBar;
