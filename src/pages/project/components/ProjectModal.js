import React from "react";
import BaseModal from "../../../components/BaseModal";
import { Form, Input, Select } from "antd";
import { roles } from "../../../constants/app";

export const ProjectModal = ({ open, onCancel, account, title }) => {
	const roleOptions = [
		{
			value: roles.STUDENT,
			label: "Sinh viên",
		},
		{
			value: roles.TEACHER,
			label: "Giáo viên",
		},
	];

	const statusOptions = [
		{
			value: true,
			label: "Hoạt động",
		},
		{
			value: false,
			label: "Khóa",
		},
	];

	return (
		<BaseModal title={title} open={open} onCancel={onCancel}>
			<Form layout="vertical" initialValues={account}>
				<Form.Item
					name="projectName"
					label="Tên dự án"
					rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
				>
					<Input placeholder="Nhập tên dự án..." />
				</Form.Item>
				
				<Form.Item name="role" label="Vai trò">
					<Select defaultValue={roles.STUDENT} options={roleOptions} />
				</Form.Item>
				<Form.Item name="status" label="Trạng thái">
					<Select defaultValue={true} options={statusOptions} />
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
