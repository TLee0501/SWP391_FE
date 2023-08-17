import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import ProjectApi from "../../../apis/project";
import BaseModal from "../../../components/BaseModal";
import { ClassSelect } from "./ClassSelect";

export const CreateProjectModal = ({ open, onCancel, onSuccess }) => {
	const formRef = useRef();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values) => {
		const { name, description, classId } = values;
		const data = {
			classId: classId,
			projectName: name,
			description: description,
		};

		setLoading(true);
		const success = await ProjectApi.createProject(data);
		if (success) {
			message.success("Tạo dự án thành công");
			onSuccess();
		} else {
			message.error("Tạo dự án thất bại");
		}
		setLoading(false);
		onCancel();
	};

	return (
		<BaseModal
			title="Thêm dự án"
			open={open}
			confirmLoading={loading}
			onCancel={onCancel}
			onOk={() => formRef.current?.submit()}
		>
			<Form ref={formRef} layout="vertical" onFinish={handleSubmit}>
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
					<ClassSelect />
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
