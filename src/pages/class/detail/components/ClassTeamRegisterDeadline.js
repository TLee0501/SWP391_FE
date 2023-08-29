import React, { useContext } from "react";
import { Button, DatePicker, Form, Typography } from "antd";
import { ClassContext } from "../../../../providers/class";
import dayjs from "dayjs";
import moment from "moment";

const { Title, Text } = Typography;

export const ClassTeamRegisterDeadline = () => {
	const { data } = useContext(ClassContext);
	const semesterStartTime = data?.semester?.startTime;
	const semesterEndTime = data?.semester?.endTime;

	const initialDates = [
		data?.registerTeamStartDate && dayjs(data?.registerTeamStartDate),
		data?.registerTeamEndDate && dayjs(data?.registerTeamEndDate),
	].filter((e) => e);
	console.log(initialDates);

	const onSubmit = async (values) => {
		const dates = values.dates;
		const startTime = dates?.[0];
		const endTime = dates?.[1];
		if (
			moment(startTime).isAfter(moment(semesterStartTime)) &&
			moment(endTime).isBefore(moment(semesterEndTime))
		) {
			console.log("valid date");
		}
	};

	return (
		<Form onFinish={onSubmit}>
			<Form.Item
				name="dates"
				label="Đăng ký nhóm"
				rules={[
					{
						required: true,
						message: "Vui lòng chọn thời hạn đăng ký nhóm",
					},
				]}
			>
				<DatePicker.RangePicker
					format="DD/MM/YYYY"
					placeholder={["Bắt đầu", "Kết thúc"]}
				/>
				<Button htmlType="submit" type="primary" className="ml-2">
					Cập nhật
				</Button>
			</Form.Item>
		</Form>
	);
};
