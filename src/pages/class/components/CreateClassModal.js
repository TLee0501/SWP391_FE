import { DatePicker, Form, Input, message } from "antd";
import moment from "moment";
import React, { useContext, useRef, useState } from "react";
import ClassApi from "../../../apis/class";
import BaseModal from "../../../components/BaseModal";
import { UserContext } from "../../../providers/user";
import { CourseSelect } from "./CourseSelect";

const { RangePicker } = DatePicker;

export const CreateClassModal = ({ open, onCancel, onSuccess }) => {
	const { user } = useContext(UserContext);

	const formRef = useRef();

	const [classCreating, setClassCreating] = useState(false);

	const handleCreateClass = async (values) => {
		const { userId } = user;
		const { course, name, dates } = values;

		const data = {
			courseId: course,
			userId: userId,
			className: name,
			timeStart: dates[0],
			timeEnd: dates[1],
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
					<CourseSelect />
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
