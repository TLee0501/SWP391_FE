import { DatePicker, Form, Input, Select, message } from "antd";
import moment from "moment";
import React, { useContext, useEffect, useRef, useState } from "react";
import CourseApi from "../../../apis/course";
import BaseModal from "../../../components/BaseModal";
import { UserContext } from "../../../providers/user";
import ClassApi from "../../../apis/class";

const { RangePicker } = DatePicker;

export const CreateClassModal = ({ open, onCancel, onSuccess }) => {
	const { user } = useContext(UserContext);

	const formRef = useRef();

	const [classCreating, setClassCreating] = useState(false);

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

	const handleCreateClass = async (values) => {
		const { userId } = user;
		const { course, name, dates, enrollCode } = values;

		const data = {
			courseId: course,
			userId: userId,
			className: name,
			timeStart: dates[0],
			timeEnd: dates[1],
			enrollCode: enrollCode,
		};

		setClassCreating(true);
		const success = await ClassApi.createClass(data);
		if (success) {
			message.success("Tạo lớp học thành công");
			onSuccess();
		} else {
			message.error("Tạo lớp học thất bại");
		}
		setClassCreating(false);
		onCancel();
	};

	return (
		<BaseModal
			title="Tạo lớp học"
			open={open}
			onCancel={onCancel}
			confirmLoading={classCreating}
			onOk={() => formRef.current?.submit()}
		>
			<Form ref={formRef} layout="vertical" onFinish={handleCreateClass}>
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
				<Form.Item
					name="enrollCode"
					label="Mã tham gia"
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
