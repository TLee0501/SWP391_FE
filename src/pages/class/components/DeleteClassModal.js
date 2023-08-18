import React, { useState } from "react";
import BaseModal from "../../../components/BaseModal";
import { message } from "antd";
import ClassApi from "../../../apis/class";

export const DeleteCLassModal = ({
	open,
	onCancel,
	classes,
	onDeleteSuccess,
}) => {
	const [loading, setLoading] = useState(false);

	const handleDeleteCourse = () => {
		const { classId } = classes;
		setLoading(true);
		ClassApi.deleteClass(classId).then((success) => {
			if (success) {
				message.success("Xóa lớp học thành công");
				onCancel();
				onDeleteSuccess();
			} else {
				message.error("Xóa lớp học thất bại");
				onCancel();
			}
			setLoading(false);
		});
	};

	return (
		<BaseModal
			open={open}
			title="Bạn muốn xóa lớp học này?"
			onCancel={onCancel}
			onOk={handleDeleteCourse}
			okType="danger"
			confirmLoading={loading}
		/>
	);
};
