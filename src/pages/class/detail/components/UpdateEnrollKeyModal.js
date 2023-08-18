import React, { useRef } from "react";
import BaseModal from "../../../../components/BaseModal";
import { Form, Input } from "antd";

export const UpdateEnrollKeyModal = ({ open, onCancel, classId }) => {
	const formRef = useRef();

	return (
		<BaseModal
			open={open}
			onCancel={onCancel}
			title="Cập nhật mã tham gia"
			onOk={() => formRef.current?.submit()}
		>
			<Form ref={formRef}>
				<Form.Item
					name="enrollKey"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập mã tham gia",
						},
					]}
				>
					<Input placeholder="Nhập mã tham gia..." />
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
