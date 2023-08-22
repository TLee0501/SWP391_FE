import { Form, Input, Typography } from "antd";
import React, { useEffect, useRef } from "react";
import BaseModal from "../../../components/BaseModal";
import { RichTextEditor } from "../../../components/RichTextEditor";
import { ClassSelect } from "./ClassSelect";

const { Text } = Typography;

export const ProjectDetailModal = ({
	open,
	title,
	project,
	submitting,
	onCancel,
	onSubmit,
	edit,
}) => {
	const formRef = useRef();
	const descRef = useRef();

	useEffect(() => {
		const desc = project?.description;
		if (desc) {
			descRef.current = desc;
		}
	}, [project]);

	const handleSubmit = async (values) => {
		const { name, classId } = values;
		const data = {
			classId: classId,
			projectName: name,
			description: descRef.current,
		};

		onSubmit && (await onSubmit(data));

		onCancel();
	};

	return (
		<BaseModal
			title={title}
			open={open}
			confirmLoading={submitting}
			onCancel={onCancel}
			onOk={() => formRef.current?.submit()}
		>
			<Form
				ref={formRef}
				layout="vertical"
				onFinish={handleSubmit}
				initialValues={{
					name: project?.projectName,
					description: project?.description,
					classId: project?.classID,
				}}
			>
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
			</Form>

			<div style={{ marginBottom: 8 }}>
				<Text>Mô tả</Text>
			</div>
			<RichTextEditor
				value={project?.description}
				onChange={(value) => (descRef.current = value)}
				placeholder="Nhập mô tả dự án..."
			/>
		</BaseModal>
	);
};
