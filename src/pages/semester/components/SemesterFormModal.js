import { Info } from "@icon-park/react";
import {
	Button,
	DatePicker,
	Form,
	Row,
	Select,
	Tooltip,
	Typography,
} from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { mockSemesterTypes } from "../../../__mocks__/semester";
import BaseModal from "../../../components/BaseModal";

const { Text } = Typography;

export const SemesterFormModal = ({
	semester,
	title,
	open,
	onCancel,
	onSubmit,
	submitting,
	onChange,
}) => {
	const formRef = useRef();

	const now = new Date();
	const oneYearLater = new Date(now);
	oneYearLater.setFullYear(now.getFullYear() + 1);
	const [academicYear, setAcademicYear] = useState(now.getFullYear());
	const years = [now.getFullYear(), oneYearLater.getFullYear()];

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [type, setType] = useState();

	const getSemesterName = () => {
		if (!startDate || !endDate || !type) {
			return "-";
		}
		return `${
			mockSemesterTypes.find((e) => e.id === type).name
		}${academicYear}_${startDate.date()}${startDate.format(
			"MM"
		)}_${endDate.date()}${endDate.format("MM")}`;
	};

	const onFinish = (values) => {
		console.log("Semester submit: ", values);
		onSubmit?.(values);
	};

	return (
		<BaseModal
			title={title}
			open={open}
			onCancel={onCancel}
			onOk={() => formRef.current?.submit()}
		>
			<Form
				ref={formRef}
				onFinish={onFinish}
				layout="vertical"
				initialValues={{
					academicYear: academicYear,
				}}
			>
				<Form.Item
					name="semesterName"
					label={
						<Row align="middle">
							<Text style={{ margin: 0, padding: 0 }}>Tên học kỳ</Text>
							<Tooltip title="Tên học kỳ theo định dạng [Loại]_[Năm học]_[Ngày bắt đầu]_[Ngày kết thúc]">
								<Button icon={<Info />} type="link" style={{ padding: 0 }} />
							</Tooltip>
						</Row>
					}
				>
					<Text strong>{getSemesterName()}</Text>
				</Form.Item>
				<Form.Item
					name="academicYear"
					label="Năm học"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn năm học",
						},
					]}
				>
					<Select
						placeholder="Chọn năm học"
						options={years.map((e) => {
							return {
								label: e,
								value: e,
							};
						})}
						defaultValue={years[0]}
						onChange={(v) => {
							setAcademicYear(v);
						}}
					/>
				</Form.Item>
				<Form.Item
					name="dates"
					label="Thời gian"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn ngày bắt đầu & kết thúc",
						},
					]}
				>
					<DatePicker.RangePicker
						format="DD/MM/YYYY"
						placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
						disabledDate={(date) => date.isBefore(moment().subtract(1, "days"))}
						onChange={(values) => {
							setStartDate(values?.[0]);
							setEndDate(values?.[1]);
						}}
					/>
				</Form.Item>
				<Form.Item
					name="semesterType"
					label="Loại học kỳ"
					rules={[
						{
							required: true,
							message: "Vui lòng chọn loại học kỳ",
						},
					]}
				>
					<Select
						placeholder="Chọn loại học kỳ"
						options={mockSemesterTypes.map((e) => {
							return {
								label: e.name,
								value: e.id,
							};
						})}
						onChange={(value) => {
							setType(value);
						}}
					/>
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
