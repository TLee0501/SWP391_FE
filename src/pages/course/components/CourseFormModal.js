import { Form, Input, Select } from "antd";
import React, { useRef } from "react";
import BaseModal from "../../../components/BaseModal";

export const CourseFormModal = ({
	title,
	course,
	open,
	edit,
	onCancel,
	onSubmit,
}) => {
	const formRef = useRef();

	const statusOptions = [
		{ value: true, label: "Kích hoạt" },
		{ value: false, label: "Chưa kích hoạt" },
	];

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
					<Input placeholder="Mã môn học..." disabled={edit} />
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
				<Form.Item
					name="active"
					label="Trạng thái"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn trạng thái",
						},
					]}
				>
					<Select
						options={statusOptions}
						placeholder="Trạng thái"
						defaultValue={true}
					/>
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
