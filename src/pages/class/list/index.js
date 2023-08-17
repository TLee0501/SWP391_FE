import { Plus } from "@icon-park/react";
import { Button, Input, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import ClassApi from "../../../apis/class";
import { CreateClassModal } from "../components/CreateClassModal";
import { ClassList } from "./components/ClassList";

const ClassListPage = () => {
	const [showCreateClassModal, setShowCreateClassModal] = useState(false);

	const [classLoading, setClassLoading] = useState(false);
	const [classes, setClasses] = useState([]);

	const handleShowCreateClassModal = () => {
		setShowCreateClassModal(true);
	};
	const handleCloseCreateClassModal = () => {
		setShowCreateClassModal(false);
	};

	const handleCreateClassSuccess = () => {};

	const getAllClasses = async (courseId) => {
		setClassLoading(true);
		const data = await ClassApi.getAllClasses(courseId);
		setClasses(data);
		setClassLoading(false);
	};

	useEffect(() => {
		getAllClasses();
	}, []);

	return (
		<div>
			<Row justify="space-between" className="mb-4">
				<Input.Search className="w-1/2" placeholder="Tìm lớp học..." />
				<Button
					className="flex-center"
					type="primary"
					icon={<Plus />}
					onClick={handleShowCreateClassModal}
				>
					Thêm lớp học
				</Button>
			</Row>
			<Spin spinning={classLoading}>
				<ClassList classes={classes} />
			</Spin>
			<CreateClassModal
				open={showCreateClassModal}
				onCancel={handleCloseCreateClassModal}
				onSuccess={handleCreateClassSuccess}
			/>
		</div>
	);
};

export default ClassListPage;
