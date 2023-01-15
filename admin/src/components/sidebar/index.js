import React from "react";
import Routes from "./admin-routes";
import { Link, useLocation } from "react-router-dom";
import { slideToggle } from "../slideToggle";
import { BsShop } from "react-icons/bs";

const Sidebar = ({ setshowSidebar, showSidebar }) => {
  const router = useLocation();
  const path = router.pathname;
  const toggleSubMenu = (e) => {
    const subMenu = e.currentTarget.nextSibling;
    if (subMenu) {
      slideToggle(subMenu);
    }
  };

  return (
    <>
      <div onClick={() => setshowSidebar(false)} className={`sidebaroverlay ${showSidebar && 'showOnMobile'}`}></div>
      <div className={`admin__sidebar ${showSidebar && 'showOnMobile'}`}>
        <div className="admin_logo">
          <img src="/logo.jpg" alt="" /> Balloon express
        </div>
        <ul className="sidebar-nav">
          {Routes.map((route, index) => {
            return (
              <li
                key={index}
                className={route.subMenu?.length > 0 ? "hasSubMenu" : ""}>
                <Link
                  onClick={toggleSubMenu}
                  className={
                    !route.path
                      ? Object.keys(route.subMenu).some(function (key) {
                          return route.subMenu[key].path === path;
                        })
                        ? "active"
                        : ""
                      : path === route.path
                      ? "active"
                      : ""
                  }
                  to={route.subMenu?.length > 0 ? "#" : route.path}>
                  {route.icon}
                  <span>{route.title}</span>
                </Link>
                {route.subMenu && (
                  <ul className="sidebar-sub-nav">
                    {route.subMenu.map((subRoute, subIndex) => {
                      return (
                        <li key={subIndex}>
                          <Link
                            className={path === subRoute.path ? "active" : ""}
                            to={subRoute.path}>
                            {subRoute.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
