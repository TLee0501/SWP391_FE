import {
	DegreeHat,
	DocumentFolder,
	User,
	Dashboard,
	Classroom,
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
	console.log("permissions: ", permissions);

	const canViewAccount = permissions?.includes(ALL_PERMISSIONS.account.view);
	const canViewCourse = permissions?.includes(ALL_PERMISSIONS.course.view);
	const canViewClass = permissions?.includes(ALL_PERMISSIONS.class.view);
	const canViewProject = permissions?.includes(ALL_PERMISSIONS.project.view);

	const itemKeys = {
		ACCOUNT: "MANAGE_ACCOUNT",
		COURSE: "MANAGE_COURSE",
		PROJECT: "MANAGE_PROJECT",
		CLASS: "MANAGE_CLASS",
	};

	const items = [
		canViewAccount && {
			key: itemKeys.ACCOUNT,
			icon: <User />,
			label: <Link to={routes.dashboard.accounts}>Tài khoản</Link>,
		},
		canViewCourse && {
			key: itemKeys.COURSE,
			icon: <DegreeHat />,
			label: <Link to={routes.dashboard.courses}>Môn học</Link>,
		},
		canViewClass && {
			key: itemKeys.CLASS,
			icon: <Classroom />,
			label: <Link to={routes.dashboard.classes}>Lớp học</Link>,
		},
		canViewProject && {
			key: itemKeys.PROJECT,
			icon: <DocumentFolder />,
			label: <Link to={routes.dashboard.projects}>Dự án</Link>,
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
					<Dashboard style={{ color: "white", fontSize: 32 }} />
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
