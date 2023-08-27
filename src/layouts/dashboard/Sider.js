import {
	DegreeHat,
	DocumentFolder,
	User,
	Dashboard,
	Classroom,
	Analysis,
	Hourglass,
} from "@icon-park/react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../constants/routes";
import { usePermissions } from "../../hooks/permission";
import { ALL_PERMISSIONS } from "../../constants/app";
import config from "../../constants/config";

export const AppSider = () => {
	const location = useLocation();
	const permissions = usePermissions();

	const canViewAccount = permissions?.includes(ALL_PERMISSIONS.account.sider);
	const canViewCourse = permissions?.includes(ALL_PERMISSIONS.course.sider);
	const canViewClass = permissions?.includes(ALL_PERMISSIONS.class.sider);
	const canViewProject = permissions?.includes(ALL_PERMISSIONS.project.sider);
	const canViewReport = permissions?.includes(ALL_PERMISSIONS.report.sider);
	const canViewSemester = permissions?.includes(ALL_PERMISSIONS.semester.sider);

	const itemKeys = {
		ACCOUNT: "MANAGE_ACCOUNT",
		COURSE: "MANAGE_COURSE",
		PROJECT: "MANAGE_PROJECT",
		CLASS: "MANAGE_CLASS",
		TEAM_REQUEST: "MANAGE_TEAM_REQUEST",
		REPORT: "MANAGE_REPORT",
		SEMESTER: "MANAGE_SEMESTER",
	};
	const items = [
		canViewAccount && {
			key: itemKeys.ACCOUNT,
			icon: <User size={20} />,
			label: <Link to={routes.dashboard.accounts}>Tài khoản</Link>,
		},
		canViewCourse && {
			key: itemKeys.COURSE,
			icon: <DegreeHat size={20} />,
			label: <Link to={routes.dashboard.courses}>Môn học</Link>,
		},
		canViewSemester && {
			key: itemKeys.SEMESTER,
			icon: <Hourglass size={20} />,
			label: <Link to={routes.dashboard.semester}>Học kỳ</Link>,
		},
		canViewClass && {
			key: itemKeys.CLASS,
			icon: <Classroom size={20} />,
			label: <Link to={routes.dashboard.classes}>Lớp học</Link>,
		},
		canViewProject && {
			key: itemKeys.PROJECT,
			icon: <DocumentFolder size={20} />,
			label: <Link to={routes.dashboard.projects}>Dự án</Link>,
		},
		canViewReport && {
			key: itemKeys.REPORT,
			icon: <Analysis size={20} />,
			label: <Link to={routes.dashboard.report}>Báo cáo dự án</Link>,
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
			case routes.dashboard.teamRequest:
				return itemKeys.TEAM_REQUEST;
			case routes.dashboard.report:
				return itemKeys.REPORT;
			case routes.dashboard.semester:
				return itemKeys.SEMESTER;
			default:
		}

		return undefined;
	};

	return (
		<Sider
			width={config.SIDER_WIDTH}
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
