import { Info } from "@icon-park/react";
import {
	Button,
	DatePicker,
	Form,
	Row,
	Select,
	Tooltip,
	Typography,
	message,
} from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { mockSemesterTypes } from "../../../__mocks__/semester";
import BaseModal from "../../../components/BaseModal";
import { SemesterTypeOptions } from "../../../constants/app";

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

	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [type, setType] = useState();
	const [loading, setLoading] = useState(false);
	const [year, setYear] = useState(2023);

	// const years = [];
	// for (let year = 2023; year <= 2100; year++) {
	// 	years.push(year);
	// }

	// const handleSemesterChange = (value) => {
	// 	const start = new Date(year, 0, 1);
	// 	const end = new Date(year, 3, 31);

	// 	if (value === "Spring") {
	// 		setStartDate(start);
	// 		setEndDate(end);
	// 	} else if (value === "Summer") {
	// 		setStartDate(start.setMonth(4), start.setDate(1));
	// 		setEndDate(end.setMonth(6), end.setDate(31));
	// 	} else if (value === "Fall") {
	// 		setStartDate(start.setMonth(7), start.setDate(1));
	// 		setEndDate(end.setMonth(9), end.setDate(31));
	// 	} else {
	// 		setStartDate(start.setMonth(10), start.setDate(1));
	// 		setEndDate(end.setMonth(12), end.setDate(31));
	// 	}
	// 	setType(value);
	// 	message.success(`success ${value}`);
	// };

	const getSemesterName = () => {
		if (!startDate || !endDate || !type) {
			return "-";
		}
		return `${
			mockSemesterTypes.find((e) => e.id === type)?.name
		}${year}_${startDate.date()}${startDate.format(
			"MM"
		)}_${endDate.date()}${endDate.format("MM")}`;
	};

	const handleChange = (values) => {
		setStartDate(values[0]);
		setEndDate(values[1]);
	};

	const onFinish = (values) => {
		const semeterName = getSemesterName();
		// const times = handleSemesterChange();
		console.log("Semester submit: ", values);
		values.semeterName = semeterName;
		// values.times = times;
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
					setYear: setYear,
				}}
			>
				<Form.Item
					name="semeterName"
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
						value={[startDate, endDate]}
						format="DD/MM"
						placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
						onChange={handleChange}
						disabledDate={(date) => date.isBefore(moment().subtract(1, "days"))}
						className="w-full"
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
						// options={SemesterTypeOptions}
						value={type}
						loading={loading}
						options={mockSemesterTypes.map((e) => {
							return {
								label: e.name,
								value: e.id,
							};
						})}
						onChange={(value) => {
							setType(value);
						}}
						// onChange={handleSemesterChange}
					/>
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
