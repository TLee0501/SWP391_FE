import React from "react";
import BaseModal from "../../../components/BaseModal";
import { Form, Input, DatePicker, Select } from "antd";
import moment from "moment";
import { mockCourses } from "../../../__mocks__/course";

const { RangePicker } = DatePicker;

export const CreateClassModal = ({ open, onCancel }) => {
	const courseOptions = mockCourses.map((e) => {
		return {
			value: e.id,
			label: e.name,
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
					<Select options={courseOptions} placeholder="Chọn môn học" />
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
