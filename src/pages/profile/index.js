import React from "react";
import { Form, Input, Typography } from "antd";

const { Text, Title } = Typography;

const ProfilePage = () => {
	return (
		<div>
			<Title level={4}>Hồ sơ của bạn</Title>
			<Form layout="vertical" className="w-1/2">
				<Form.Item name="email" label="Email">
					<Input placeholder="Email" disabled readOnly />
				</Form.Item>
				<Form.Item name="code" label="Mã số sinh viên">
					<Input placeholder="Mã số sinh viên..." disabled readOnly />
				</Form.Item>
				<Form.Item name="fullName" label="Họ tên">
					<Input placeholder="Họ tên của bạn..." disabled readOnly />
				</Form.Item>
				<Form.Item name="phoneNumber" label="Số điện thoại">
					<Input placeholder="Số điện thoại của bạn..." disabled readOnly />
				</Form.Item>
			</Form>
		</div>
	);
};

export default ProfilePage;
