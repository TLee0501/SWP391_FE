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
import React, { useEffect, useRef, useState } from "react";
import { mockSemesterTypes } from "../../../__mocks__/semester";
import BaseModal from "../../../components/BaseModal";
import SemesterApi from "../../../apis/semester";
import { Option } from "rc-select";

const { Text } = Typography;

export const SemesterFormModal = ({
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
	oneYearLater.setFullYear(now.getFullYear());
	const [academicYear, setAcademicYear] = useState(now.getFullYear());
	// const years = [now.getFullYear(), oneYearLater.getFullYear()];
	const [startDate, setStartDate] = useState("1/1");
	const [endDate, setEndDate] = useState("31/1");
	const [type, setType] = useState();
	const [semestersType, setSemestersType] = useState("Spring");
	const [loading, setLoading] = useState(false);
	const [year, setYear] = useState(2023);

	const years = [];
	for (let year = 2023; year <= 2100; year++) {
		years.push(year);
	}

	const handleSemesterChange = (value) => {
		const start = new Date(year, 0, 1);
		const end = new Date(year, 3, 31);

		if (value === "Spring") {
			setStartDate(start);
			setEndDate(end);
		} else if (value === "Summer") {
			setStartDate(start.setMonth(4));
			setEndDate(end.setMonth(6));
		} else if (value === "Fall") {
			setStartDate(start.setMonth(7));
			setEndDate(end.setMonth(9));
		} else {
			setStartDate(start.setMonth(10));
			setEndDate(end.setMonth(12));
		}
	};

	const getSemesterName = () => {
		if (!startDate || !endDate || !type) {
			return "-";
		}
		return `${mockSemesterTypes.find((e) => e.id === type)?.name
			}-${year}-${startDate.date()}${startDate.format(
				"MM"
			)}-${endDate.date()}${endDate.format("MM")}`;
	};

	const handleChange = (values) => {
		setStartDate(values[0]);
		setEndDate(values[1]);
	};

	const onFinish = (values) => {
		const semesterName = getSemesterName();
		const times = handleSemesterChange();
		console.log("Semester submit: ", values);
		values.semesterName = semesterName;
		values.times = times;
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
					<Select value={year} onChange={(value) => setYear(value)}>
						{years.map((year) => (
							<Option key={year} value={year}>{year}</Option>
						))}
					</Select>
					{/* <Select
						placeholder="Chọn năm học"
						// options={years.map((e) => {
						// 	return {
						// 		label: e,
						// 		value: e,
						// 	};
						// })}
						// onChange={(v) => {
						// 	setAcademicYear(v);
						// }}
						options={options}
					/> */}
				</Form.Item>
				<Form.Item
					name="dates"
					label="Thời gian"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: "Vui lòng chọn ngày bắt đầu & kết thúc",
				// 	},
				// ]}
				>
					<DatePicker.RangePicker
						value={[startDate, endDate]}
						format="DD/MM"
						// disabled
						placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
						// disabledDate={(date) => date.isBefore(moment().subtract(1, "days"))}
						// onChange={(values) => {
						// 	setStartDate(values?.[0]);
						// 	setEndDate(values?.[1]);
						// }}
						onChange={handleChange}

					/>
				</Form.Item>
				<Form.Item
					name="semesterType"
					label="Loại học kỳ"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: "Vui lòng chọn loại học kỳ",
				// 	},
				// ]}
				>
					<Select placeholder="Chọn loại học kỳ" value={semestersType} onChange={handleSemesterChange}>
						<option value="Spring">Spring</option>
						<option value="Summer">Summer</option>
						<option value="Fall">Fall</option>
						<option value="Winter">Winter</option>
					</Select>
					{/* <Select
						placeholder="Chọn loại học kỳ"
						// options={semesterTypesOptions}
						value={semestersType}
						loading={loading}
						onChange={handleSemesterChange}
						
						// options={mockSemesterTypes.map((e) => {
						// 	return {
						// 		label: e.name,
						// 		value: e.id,
						// 	};
						// })}
						// onChange={(value) => {
						// 	setType(value);
						// }}
					/> */}
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
