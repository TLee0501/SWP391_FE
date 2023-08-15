import { Plus } from "@icon-park/react";
import { Button, Input, Row, Spin, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import CourseApi from "../../../apis/course";
import { CourseFormModal } from "../components/CourseFormModal";
import { DeleteCourseModal } from "../components/DeleteCourseModal";
import { CourseList } from "./components/CourseList";

export const CourseListPage = () => {
	const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
	const [courseCreating, setCourseCreating] = useState(false);

	const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);

	const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);

	const [courseLoading, setCourseLoading] = useState(false);
	const [courses, setCourses] = useState([]);

	const updatingCourse = useRef();
	const deletingCourse = useRef();

	useEffect(() => {
		getCourses();
	}, []);

	// Get courses
	const getCourses = async (keyword) => {
		setCourseLoading(true);
		const data = await CourseApi.searchCourses(keyword);
		setCourses(data);
		setCourseLoading(false);
	};
	// End get courses

	// Add course
	const handleShowAddCourseModal = () => {
		setShowCreateCourseModal(true);
	};
	const handleCloseCreateCourseModal = () => {
		setShowCreateCourseModal(false);
		setCourseCreating(false);
	};
	const handleAddCourse = (course) => {
		setCourseCreating(true);
		const { code, name } = course;
		const data = {
			courseCode: code,
			courseName: name,
		};

		CourseApi.createCourse(data).then(({ success, data }) => {
			if (success) {
				message.success(data);
				handleCloseCreateCourseModal();
				getCourses();
			} else {
				message.error(data);
			}
			setCourseCreating(false);
		});
	};
	// End add course

	// Update course
	const handleShowUpdateCourseModal = (course) => {
		updatingCourse.current = course;
		setShowUpdateCourseModal(true);
	};
	const handleCloseUpdateCourseModal = () => {
		updatingCourse.current = undefined;
		setShowUpdateCourseModal(false);
	};
	const handleUpdateCourse = (course) => {
		console.log("Update course: ", course);
	};
	// End update course

	// Delete course
	const handleShowDeleteCourseModal = (course) => {
		deletingCourse.current = course;
		setShowDeleteCourseModal(true);
	};
	const handleCloseDeleteCourseModal = () => {
		deletingCourse.current = undefined;
		setShowDeleteCourseModal(false);
	};
	const handleDeleteSuccess = () => {
		getCourses();
	};
	// End delete course

	return (
		<div>
			<Row justify="space-between">
				<Input.Search
					style={{ width: "50%" }}
					placeholder="Tìm môn học theo mã hoặc tên..."
					onSearch={(value) => getCourses(value)}
				/>
				<Button
					className="flex-center"
					type="primary"
					icon={<Plus />}
					onClick={handleShowAddCourseModal}
				>
					Thêm môn học
				</Button>
			</Row>
			<Spin spinning={courseLoading}>
				<CourseList
					courses={courses}
					onUpdate={handleShowUpdateCourseModal}
					onDelete={handleShowDeleteCourseModal}
				/>
			</Spin>
			<CourseFormModal
				open={showCreateCourseModal}
				title="Tạo môn học"
				onCancel={handleCloseCreateCourseModal}
				onSubmit={handleAddCourse}
				confirmLoading={courseCreating}
			/>
			<CourseFormModal
				open={showUpdateCourseModal}
				title="Cập nhật môn học"
				course={updatingCourse.current}
				onCancel={handleCloseUpdateCourseModal}
				onSubmit={handleUpdateCourse}
				edit={true}
			/>
			<DeleteCourseModal
				onCancel={handleCloseDeleteCourseModal}
				onDeleteSuccess={handleDeleteSuccess}
				open={showDeleteCourseModal}
				course={deletingCourse.current}
			/>
		</div>
	);
};
