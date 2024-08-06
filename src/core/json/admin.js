/* eslint-disable indent */
import React from "react";

import * as Icon from "react-feather";

const AdminSidebarData = () => {
 

  return( [
    {
      label:"Admin",
      submenuOpen: true,
      showSubRoute: false,
      submenuHdr: "Inventory",
      submenuItems: [
        {
          label: "Admin Dashboard",
          link: "/admin-dashboard",
          icon: <Icon.Box />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Institution",
          link: "/institution",
          icon: <Icon.Codesandbox />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Resource",
          link: "/resource",
          icon: <Icon.Layers />,
          // icon: <Icon.Codesandbox />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Latest News",
          link: "/latest-news",
          icon: <Icon.Bookmark />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Users",
          // link: "/idea",
          icon: <Icon.Users />,
          showSubRoute: false,
          submenu: false,
        },
        {
          label:"Reports",
          link: "/reports",
          icon: <Icon.Database />,
          showSubRoute: false,
          submenu: false,
        },
       
      ],
    },
   
  ]
);
};

export default AdminSidebarData;
