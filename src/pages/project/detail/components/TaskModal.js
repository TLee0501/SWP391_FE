import React, { useRef } from "react";
import BaseModal from "../../../../components/BaseModal";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { TaskStatus } from "../../../../constants/app";

export const TaskModal = ({
	open,
	onCancel,
	title,
	onSubmit,
	edit,
	task,
	confirmLoading,
}) => {
	const formRef = useRef();

	const statusOptions = [
		{
			value: TaskStatus.NEW,
			label: "Cần làm",
		},
		{
			value: TaskStatus.INPROGRESS,
			label: "Đang làm",
		},
		{
			value: TaskStatus.COMPLETED,
			label: "Đã hoàn thành",
		},
	];

	return (
		<BaseModal
			open={open}
			onCancel={onCancel}
			title={title}
			onOk={() => formRef.current?.submit()}
			confirmLoading={confirmLoading}
		>
			<Form
				ref={formRef}
				layout="vertical"
				onFinish={onSubmit}
				initialValues={{
					taskName: task?.taskName,
					taskDescription: task?.taskDescription,
				}}
			>
				<Form.Item
					name="taskName"
					label="Tên công việc"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tên công việc",
						},
					]}
				>
					<Input placeholder="Nhập tên công việc..." />
				</Form.Item>
				<Form.Item name="taskDescription" label="Mô tả công việc">
					<TextArea placeholder="Nhập mô tả công việc..." />
				</Form.Item>
				{edit && (
					<Form.Item
						name="status"
						label="Trạng thái"
						rules={[
							{
								required: true,
								message: "Vui lòng chọn trạng thái",
							},
						]}
					>
						<Select options={statusOptions} defaultValue={TaskStatus.NEW} />
					</Form.Item>
				)}
			</Form>
		</BaseModal>
	);
};
