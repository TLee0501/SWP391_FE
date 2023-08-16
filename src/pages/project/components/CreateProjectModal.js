import React from "react";
import BaseModal from "../../../components/BaseModal";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { mockClasses } from "../../../__mocks__/class";

export const CreateProjectModal = ({ open, onCancel }) => {
	const classOptions = mockClasses.map((e) => {
		return {
			value: e.id,
			label: e.name,
		};
	});

	return (
		<BaseModal title="Thêm dự án" open={open} onCancel={onCancel}>
			<Form layout="vertical">
				<Form.Item
					name="name"
					label="Tên dự án"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tên dự án",
						},
					]}
				>
					<Input placeholder="Nhập tên dự án..." />
				</Form.Item>
				<Form.Item name="description" label="Mô tả">
					<TextArea placeholder="Nhập mô tả dự án..." />
				</Form.Item>
				<Form.Item
					name="classId"
					label="Lớp học"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn lớp học",
						},
					]}
				>
					<Select options={classOptions} placeholder="Chọn lớp học" />
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
