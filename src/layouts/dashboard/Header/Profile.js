import { Dropdown } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Down, User, Logout } from "@icon-park/react";
import styled from "styled-components";
import routes from "../../../constants/routes";

const Container = styled.div`
	color: white;
`;

export const ProfileBar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate(routes.login);
	};

	const items = [
		{
			key: "PROFILE",
			label: <Link to={routes.dashboard.profile}>Hồ sơ</Link>,
			icon: <User />,
		},
		{
			key: "LOGOUT",
			label: <span>Đăng xuất</span>,
			icon: <Logout />,
			danger: true,
			onClick: handleLogout,
		},
	];

	return (
		<Container>
			<Dropdown
				menu={{
					items,
				}}
			>
				<span className="cursor-pointer">
					NGUYEN MINH HOANG <Down />
				</span>
			</Dropdown>
		</Container>
	);
};
