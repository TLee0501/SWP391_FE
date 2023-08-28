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
						options={SemesterTypeOptions}
						value={type}
						loading={loading}
						onChange={(value) => {
							setType(value);
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
						value={[startDate, endDate]}
						format="DD/MM/YYYY"
						placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
						onChange={handleChange}
						disabledDate={(date) => date.isBefore(moment().subtract(1, "days"))}
						className="w-full"
					/>
				</Form.Item>
			</Form>
		</BaseModal>
	);
};
