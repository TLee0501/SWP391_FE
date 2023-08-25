import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { User } from "@icon-park/react";
import { Button, Col, Form, Row, Select, Typography, message } from "antd";
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
	project,
	classId,
}) => {
	const formRef = useRef();

	const onFinish = async (values) => {
		await onSubmit({ ...values, projectId: project?.projectId, classId });
	};

	const studentList = Students.map((item) => {
		return {
			value: item.userId,
			label: `${item.fullName} (${item.email})`,
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
			<Form
				ref={formRef}
				layout="vertical"
				onFinish={onFinish}
				initialValues={{
					listStudent: [undefined],
				}}
			>
				<div>
					<Text strong style={{ fontSize: 16 }}>
						Dự án mong muốn làm:
					</Text>
				</div>
				<div className="mb-4 mt-2">
					<Text>{project?.projectName}</Text>
				</div>
				<Text strong style={{ fontSize: 16 }}>
					Thành viên nhóm (Tối đa 5)
				</Text>
				<div className="mb-2"></div>
				<Form.List name="listStudent">
					{(fields, { add, remove }) => (
						<>
							{fields.map((field, index) => {
								return (
									<Row key={field.key} align="middle" gutter={4}>
										<Col span={22}>
											<Form.Item
												{...field}
												label={`Thành viên ${index + 1}`}
												key={`member-${index}`}
												rules={[
													{
														required: true,
														message: "Vui lòng chọn thành viên nhóm",
													},
												]}
											>
												<Select
													placeholder="Chọn thành viên"
													options={studentList}
													allowClear
													suffixIcon={<User />}
												/>
											</Form.Item>
										</Col>
										<Col>
											{fields.length > 1 && (
												<Button
													className="flex-center mt-1"
													type="text"
													danger
													icon={<MinusCircleOutlined />}
													onClick={() => remove(field.name)}
												/>
											)}
										</Col>
									</Row>
								);
							})}
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
