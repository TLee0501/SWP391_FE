import { Form, Input } from "antd";
import React, { useRef, useState } from "react";
import BaseModal from "../../../../components/BaseModal";

export const EnrollClassModal = ({ open, onCancel, onSuccess }) => {
	const formRef = useRef();

	const [loading, setLoading] = useState(false);

	const onSubmit = async (values) => {
		const { enrollCode } = values;
		setLoading(true);
		console.log("Enroll class: ", enrollCode);
		onSuccess();
		onCancel();
		setLoading(false);
	};

	return (
		<BaseModal
			open={open}
			onCancel={onCancel}
			title="Tham gia lớp học"
			onOk={() => formRef.current?.submit()}
			confirmLoading={loading}
		>
			<Form ref={formRef} onFinish={onSubmit}>
				<Form.Item
					name="enrollCode"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập mã tham gia",
						},
					]}
				>
					<Input placeholder="Mã tham gia lớp học..." />
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
