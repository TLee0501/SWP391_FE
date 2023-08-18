import { Plus } from "@icon-park/react";
import { Button, Col, Input, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import ClassApi from "../../../apis/class";
import { CreateClassModal } from "../components/CreateClassModal";
import { ClassList } from "./components/ClassList";
import { CourseSelect } from "../components/ClassSelect";
import { useSearchParams } from "react-router-dom";

const ClassListPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [showCreateClassModal, setShowCreateClassModal] = useState(false);

	const [classLoading, setClassLoading] = useState(false);
	const [classes, setClasses] = useState([]);

	const handleShowCreateClassModal = () => {
		setShowCreateClassModal(true);
	};
	const handleCloseCreateClassModal = () => {
		setShowCreateClassModal(false);
	};

	const getClasses = async (courseId, keyword) => {
		setClassLoading(true);
		const data = await ClassApi.searchClass(courseId, keyword);
		setClasses(data);
		setClassLoading(false);
	};

	const handleCreateClassSuccess = () => {
		getClasses();
	};

	const handleSearchClass = (keyword) => {
		if (keyword.length > 0) {
			searchParams.set("search", keyword);
		} else {
			searchParams.delete("search");
		}
		setSearchParams(searchParams);
	};

	const handleChangeCourse = (courseId) => {
		if (courseId) {
			searchParams.set("course", courseId);
		} else {
			searchParams.delete("course");
		}

		setSearchParams(searchParams);
	};

	const handleClearCourse = () => {
		searchParams.delete("course");
		setSearchParams(searchParams);
	};

	useEffect(() => {
		getClasses();
	}, []);

	useEffect(() => {
		const courseId = searchParams.get("course");
		const search = searchParams.get("search");
		getClasses(courseId, search);
	}, [searchParams]);

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
						<CourseSelect
							allowClear
							onChange={handleChangeCourse}
							onClear={handleClearCourse}
						/>
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
