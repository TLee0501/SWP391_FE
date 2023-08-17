import { Plus } from "@icon-park/react";
import { Button, Col, Input, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import ClassApi from "../../../apis/class";
import { CreateClassModal } from "../components/CreateClassModal";
import { ClassList } from "./components/ClassList";
import { CourseSelect } from "../components/ClassSelect";

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

	const handleCreateClassSuccess = () => {
		getAllClasses();
	};

	const getAllClasses = async (courseId) => {
		setClassLoading(true);
		const data = await ClassApi.getAllClasses(courseId);
		setClasses(data);
		setClassLoading(false);
	};

	const handleSearchClass = (keyword) => {
		ClassApi.searchClass(undefined, keyword).then((response) =>
			console.log(response)
		);
	};

	useEffect(() => {
		getAllClasses();
	}, []);

	return (
		<div>
			<Row justify="space-between" className="mb-4">
				<Col span={18}>
					<Row>
						<Input.Search
							className="w-1/2 mr-2"
							placeholder="Tìm lớp học..."
							onSearch={handleSearchClass}
						/>
						<CourseSelect allowClear />
					</Row>
				</Col>
				<Col span={6}>
					<Row justify="end">
						<Button
							className="flex-center"
							type="primary"
							icon={<Plus />}
							onClick={handleShowCreateClassModal}
						>
							Thêm lớp học
						</Button>
					</Row>
				</Col>
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
