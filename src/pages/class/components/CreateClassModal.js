import { DatePicker, Form, Input, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CourseApi from "../../../apis/course";
import BaseModal from "../../../components/BaseModal";

const { RangePicker } = DatePicker;

export const CreateClassModal = ({ open, onCancel }) => {
	const [courseLoading, setCourseLoading] = useState(false);
	const [courses, setCourses] = useState([]);

	const getCourses = async () => {
		setCourseLoading(true);
		const data = await CourseApi.searchCourses();
		setCourses(data);
		setCourseLoading(false);
	};

	useEffect(() => {
		getCourses();
	}, []);

	const courseOptions = courses.map((e) => {
		return {
			value: e.courseId,
			label: `${e.courseCode} - ${e.courseName}`,
		};
	});

	return (
		<BaseModal title="Tạo lớp học" open={open} onCancel={onCancel}>
			<Form layout="vertical">
				<Form.Item
					name="name"
					label="Tên lớp học"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tên lớp",
						},
					]}
				>
					<Input placeholder="Nhập tên lớp học..." />
				</Form.Item>
				<Form.Item
					name="dates"
					label="Thời gian"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn ngày bắt đầu & kết thúc của lớp học",
						},
					]}
				>
					<RangePicker
						placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
						disabledDate={(date) => date.isBefore(moment().subtract(1, "days"))}
					/>
				</Form.Item>
				<Form.Item
					name="course"
					label="Môn học"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn môn học",
						},
					]}
				>
					<Select
						showSearch
						options={courseOptions}
						placeholder="Chọn môn học"
						loading={courseLoading}
					/>
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
