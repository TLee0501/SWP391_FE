import {
  DegreeHat,
  DocumentFolder,
  User,
  Dashboard,
  Classroom,
  ListCheckbox,
} from "@icon-park/react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../constants/routes";
import { usePermissions } from "../../hooks/permission";
import { ALL_PERMISSIONS } from "../../constants/app";

export const AppSider = () => {
  const location = useLocation();
  const permissions = usePermissions();

  const canViewAccount = permissions?.includes(ALL_PERMISSIONS.account.view);
  const canViewCourse = permissions?.includes(ALL_PERMISSIONS.course.view);
  const canViewClass = permissions?.includes(ALL_PERMISSIONS.class.view);
  const canViewProject = permissions?.includes(ALL_PERMISSIONS.project.view);
  const canViewTeamRequest = permissions?.includes(ALL_PERMISSIONS.task.view);

  const itemKeys = {
    ACCOUNT: "MANAGE_ACCOUNT",
    COURSE: "MANAGE_COURSE",
    PROJECT: "MANAGE_PROJECT",
    CLASS: "MANAGE_CLASS",
    TASK: "MANAGE_TASK",
  };
  const items = [
    canViewAccount && {
      key: itemKeys.ACCOUNT,
      icon: <User size="24" />,
      label: <Link to={routes.dashboard.accounts}>Tài khoản</Link>,
    },
    canViewCourse && {
      key: itemKeys.COURSE,
      icon: <DegreeHat size="24" />,
      label: <Link to={routes.dashboard.courses}>Môn học</Link>,
    },
    canViewClass && {
      key: itemKeys.CLASS,
      icon: <Classroom size="24" />,
      label: <Link to={routes.dashboard.classes}>Lớp học</Link>,
    },
    canViewProject && {
      key: itemKeys.PROJECT,
      icon: <DocumentFolder size="24" />,
      label: <Link to={routes.dashboard.projects}>Dự án</Link>,
    },
    canViewTeamRequest && {
      key: itemKeys.TEAM_REQUEST,
      icon: <ListCheckbox size="24" />,
      label: <Link to={routes.dashboard.team_request}>Duyệt nhóm</Link>,
    },
  ];

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
      case routes.dashboard.team_request:
        return itemKeys.TEAM_REQUEST;
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
