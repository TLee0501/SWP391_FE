import React from "react";
import BaseModal from "../../../components/BaseModal";

export const DeleteCourseModal = ({ open, onCancel, course }) => {
	const handleDeleteCourse = () => {
		console.log("Delete course: ", course);
	};

	return (
		<BaseModal
			open={open}
			title="Bạn muốn xóa môn học này?"
			onCancel={onCancel}
			onOk={handleDeleteCourse}
			okType="danger"
		/>
	);
};
