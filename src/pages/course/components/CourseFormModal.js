import { Form, Input } from "antd";
import React, { useRef } from "react";
import BaseModal from "../../../components/BaseModal";
import TextArea from "antd/es/input/TextArea";

export const CourseFormModal = ({
	title,
	course,
	open,
	onCancel,
	onSubmit,
}) => {
	const formRef = useRef();

	const onFinish = (values) => {
		onSubmit(values);
	};

	return (
		<BaseModal
			title={title}
			open={open}
			onCancel={onCancel}
			onOk={() => formRef.current.submit()}
			destroyOnClose
		>
			<Form
				ref={formRef}
				layout="vertical"
				initialValues={course}
				onFinish={onFinish}
			>
				<Form.Item
					name="code"
					label="Mã môn học"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập mã môn học",
						},
					]}
				>
					<Input placeholder="Mã môn học..." />
				</Form.Item>
				<Form.Item
					name="name"
					label="Tên môn học"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tên môn học",
						},
					]}
				>
					<Input placeholder="Tên môn học..." />
				</Form.Item>
				<Form.Item name="description" label="Mô tả">
					<TextArea placeholder="Mô tả về môn học..." />
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
