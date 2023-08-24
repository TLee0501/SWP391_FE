import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Select, Typography, message } from "antd";
import React, { useRef } from "react";
import BaseModal from "../../../../components/BaseModal";

const { Text } = Typography;

export const CreateTeamRequest = ({
	title,
	open,
	onCancel,
	onSubmit,
	confirmLoading,
	Students,
	Projects,
	projectId,
	classId,
}) => {
	const formRef = useRef();

	const onFinish = async (values) => {
		await onSubmit({ ...values, projectId, classId });
	};

	const studentList = Students.map((item) => {
		return {
			value: item.userId,
			label: `${item.fullName} (${item.email})`,
		};
	});
	const project = Projects.map((item) => {
		return {
			value: item.projectId,
			label: item.projectName,
		};
	});
	return (
		<BaseModal
			title={title}
			open={open}
			onCancel={onCancel}
			onOk={() => formRef.current.submit()}
			confirmLoading={confirmLoading}
		>
			<Form ref={formRef} layout="vertical" onFinish={onFinish}>
				<Form.Item label="Dự án" name={"projectId"}>
					<Select defaultValue={projectId} options={project} disabled={true} />
				</Form.Item>

				<Form.Item
					name="teamName"
					label="Tên nhóm"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tên nhóm",
						},
					]}
				>
					<Input placeholder="Tên nhóm..." />
				</Form.Item>

				<Text strong style={{ fontSize: 16 }}>
					Thành viên nhóm (Tối đa 5)
				</Text>
				<div className="mb-2"></div>
				<Form.List name="listStudent">
					{(fields, { add, remove }) => (
						<>
							{fields.map((field, index) => (
								<Row align="middle" justify={"space-around"}>
									<Form.Item
										{...field}
										label={`Thành viên ${index + 1}`}
										style={{
											width: "90%",
											maxWidth: "100%",
										}}
									>
										<Select
											placeholder="Chọn thành viên"
											options={studentList}
											allowClear
										/>
									</Form.Item>

									<Button
										className="flex-center"
										type="text"
										danger
										icon={<MinusCircleOutlined />}
										onClick={() => remove(field.name)}
									/>
								</Row>
							))}
							{fields.length < 5 && (
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => {
											if (fields.length >= 5) {
												message.error("Đã vượt quá số lượng thành viên");
												return;
											}
											add();
										}}
										block
										icon={<PlusOutlined />}
									>
										Thêm thành viên
									</Button>
								</Form.Item>
							)}
						</>
					)}
				</Form.List>
			</Form>
		</BaseModal>
	);
};
