import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Select } from "antd";
import React, { useRef } from "react";
import BaseModal from "../../../../components/BaseModal";

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

	const onFinish = (values) => {
		onSubmit({ ...values, projectId, classId });

		console.log({ ...values, projectId, classId });
		console.log(projectId);
		console.log(classId);
	};

	const studentList = Students.map((item) => {
		return {
			value: item.userId,
			label: item.email,
		};
	});
	const project = Projects.map((item) => {
		return {
			value: item.projectId,
			label: item.projectName,
		};
	});
	console.log(studentList);
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
			>
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

				<Form.List name="listStudent" >
					{(fields, { add, remove }) => (
						<>
							{fields.map((field, index) => (
								<Row align="middle" justify={"space-around"}>
									<Form.Item
										{...field}							
										label={`Email ${index + 1}`}
										style={{
											width: "90%",
											maxWidth: "100%",
										}}
									>
										<Select
											placeholder="- Chọn email sinh viên"
											options={studentList}
										/>
									</Form.Item>

									<MinusCircleOutlined
										style={{ color: "red", fontSize: "20px" }}
										onClick={() => remove(field.name)}
									/>
								</Row>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Thêm sinh viên
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		</BaseModal >
	);
};
