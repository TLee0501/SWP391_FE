import {
  DegreeHat,
  DocumentFolder,
  User,
  Dashboard,
  Classroom,
  Group,
} from "@icon-park/react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header } from "antd/es/layout/layout";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../constants/routes";
import { UserContext } from "../../providers/user";

export const AppSider = () => {
  const {user} = useContext(UserContext)

  const location = useLocation();

  const itemKeys = {
    ACCOUNT: "MANAGE_ACCOUNT",
    COURSE: "MANAGE_COURSE",
    PROJECT: "MANAGE_PROJECT",
    CLASS: "MANAGE_CLASS",
    TEAM: "MANAGE_TEAM",
  };

  const items = [
    {
      key: itemKeys.ACCOUNT,
      icon: <User size="24" />,
      label: <Link to={routes.dashboard.accounts}>Tài khoản</Link>,
    },
    {
      key: itemKeys.COURSE,
      icon: <DegreeHat size="24" />,
      label: <Link to={routes.dashboard.courses}>Môn học</Link>,
    },
    {
      key: itemKeys.CLASS,
      icon: <Classroom size="24" />,
      label: <Link to={routes.dashboard.classes}>Lớp học</Link>,
    },
    {
      key: itemKeys.PROJECT,
      icon: <DocumentFolder size="24" />,
      label: <Link to={routes.dashboard.projects}>Dự án</Link>,
    },
    {
      key: itemKeys.TEAM,
      icon: <Group size="24" />,
      label: <Link to={routes.dashboard.teams}>Duyệt nhóm</Link>,
    },
  ];

  const getItems = () => {
    const allItems = [...items]
    const {role} = user
    
  }

  const getSelectedKey = () => {
    const paths = location.pathname.split("/").filter((e) => e);
    const dashboard = routes.dashboard.root.slice(1);
    if (paths[0] !== dashboard) {
      return undefined;
    }

    switch (paths[1]) {
      case routes.dashboard.accounts:
        return itemKeys.ACCOUNT;
      case routes.dashboard.courses:
        return itemKeys.COURSE;
      case routes.dashboard.projects:
        return itemKeys.PROJECT;
      case routes.dashboard.classes:
        return itemKeys.CLASS;
      case routes.dashboard.teams:
        return itemKeys.TEAM;
      default:
    }

    return undefined;
  };

  return (
    <Sider
      className="pb-4"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Header className="flex-center">
        <Link to={routes.dashboard.root}>
          <Dashboard size={"40"} style={{ color: "white", fontSize: 50 }} />
        </Link>
      </Header>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[itemKeys.ACCOUNT]}
        items={items}
        selectedKeys={[getSelectedKey()]}
      />
    </Sider>
  );
};
