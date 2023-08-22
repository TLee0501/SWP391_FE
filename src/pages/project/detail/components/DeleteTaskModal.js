import React, { useState } from "react";
import BaseModal from "../../../../components/BaseModal";

export const DeleteTaskModal = ({ open, onCancel, task }) => {
	const [loading, setLoading] = useState(false);

	const handleDelete = () => {
		setLoading(true);
		setLoading(false);
	};

	return (
		<BaseModal
			open={open}
			onCancel={onCancel}
			title="Bạn muốn xóa công việc này?"
			okType="danger"
			onOk={handleDelete}
			confirmLoading={loading}
		></BaseModal>
	);
};
