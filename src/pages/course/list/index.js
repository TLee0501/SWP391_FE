import React, { useRef, useState } from "react";
import { Button, Input, Row } from "antd";
import { CourseList } from "./components/CourseList";
import { mockCourses } from "../../../__mocks__/course";
import { Plus } from "@icon-park/react";
import { CourseFormModal } from "../components/CourseFormModal";
import { DeleteCourseModal } from "../components/DeleteCourseModal";

export const CourseListPage = () => {
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);

  const updatingCourse = useRef();
  const deletingCourse = useRef();

  // Add course
  const handleShowAddCourseModal = () => {
    setShowCreateCourseModal(true);
  };
  const handleCloseCreateCourseModal = () => {
    setShowCreateCourseModal(false);
  };
  const handleAddCourse = (course) => {
    console.log("Add course: ", course);
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
  const handleCloseDeleteCourseModal = (course) => {
    deletingCourse.current = undefined;
    setShowDeleteCourseModal(false);
  };
  // End delete course

  return (
    <div>
      <Row justify="space-between">
        <Input.Search style={{ width: "50%" }} placeholder="Tìm môn học..." />
        <Button
          className="flex-center"
          type="primary"
          icon={<Plus />}
          onClick={handleShowAddCourseModal}
        >
          Thêm môn học
        </Button>
      </Row>
      <CourseList
        courses={mockCourses}
        onUpdate={handleShowUpdateCourseModal}
        onDelete={handleShowDeleteCourseModal}
      />
      <CourseFormModal
        open={showCreateCourseModal}
        title="Tạo môn học"
        onCancel={handleCloseCreateCourseModal}
        onSubmit={handleAddCourse}
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
        open={showDeleteCourseModal}
      />
    </div>
  );
};
