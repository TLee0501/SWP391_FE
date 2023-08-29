import { Button, DatePicker, Form, Row, message } from "antd";
import dayjs from "dayjs";
import React, { useContext } from "react";
import { ClassContext } from "../../../../providers/class";
import ClassApi from "../../../../apis/class";

export const ClassTeamRegisterDeadline = () => {
	const { data } = useContext(ClassContext);
	const semesterStartTime = data?.semester?.startTime;
	const semesterEndTime = data?.semester?.endTime;

	const initialDates = [
		data?.registerTeamStartDate && dayjs(data?.registerTeamStartDate),
		data?.registerTeamEndDate && dayjs(data?.registerTeamEndDate),
	].filter((e) => e);

	const onSubmit = async (values) => {
		console.log(values);
		const dates = values.dates;
		const startTime = dates?.[0];
		const endTime = dates?.[1];

		const semesStartTime = dayjs(semesterStartTime);
		const semesEndTime = dayjs(semesterEndTime);
		const isValidDate =
			startTime.isAfter(semesStartTime) && endTime.isBefore(semesEndTime);

		if (isValidDate) {
			const request = {
				classId: data?.classId,
				startTime,
				endTime,
			};
			const success = await ClassApi.updateTeamRegisterDeadline(request);
			if (success) {
				message.success("Đã cập nhật thời hạn đăng ký nhóm");
			}
		} else {
			message.info(
				`Ngày bắt đầu & kết thúc phải nằm trong khoảng thời gian (${dayjs(
					semesStartTime
				).format("DD/MM/YYYY")} -> ${dayjs(semesEndTime)
					.subtract(1, "day")
					.format("DD/MM/YYYY")})`
			);
		}
	};

	return (
		<Form
			onFinish={onSubmit}
			initialValues={{
				dates: initialDates,
			}}
		>
			<Row>
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
				</Form.Item>
				<Button htmlType="submit" type="primary" className="ml-2">
					Cập nhật
				</Button>
			</Row>
		</Form>
	);
};
