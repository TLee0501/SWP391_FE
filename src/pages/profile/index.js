import { Form, Input, Typography } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../../providers/user";
import { getRoleName } from "../../utils";

const { Title } = Typography;

const ProfilePage = () => {
	const { user } = useContext(UserContext);

	return (
		<div>
			<Title level={3}>Hồ sơ của bạn</Title>
			<Form
				layout="vertical"
				className="w-1/2"
				initialValues={{
					email: user?.email,
					fullName: user?.fullName,
					role: getRoleName(user?.role),
				}}
			>
				<Form.Item name="fullName" label="Họ tên">
					<Input placeholder="Họ và tên của bạn..." disabled readOnly />
				</Form.Item>
				<Form.Item name="email" label="Email">
					<Input placeholder="Email..." disabled readOnly />
				</Form.Item>
				<Form.Item name="role" label="Vai trò">
					<Input placeholder="Role..." disabled readOnly />
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProfilePage;
