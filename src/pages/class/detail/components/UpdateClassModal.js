import React, { useRef, useState } from "react";
import BaseModal from "../../../../components/BaseModal";
import { Form, Input, message } from "antd";
import ClassApi from "../../../../apis/class";

export const UpdateClassModal = ({ open, onCancel, data, onSuccess }) => {
	const formRef = useRef();

	const [classUpdating, setClassUpdating] = useState(false);

	const handleUpdateClass = async (values) => {
		const { className, enrollCode, dates } = values;

		const request = {
			classId: data?.classId,
			className: className,
			timeStart: dates[0],
			timeEnd: dates[1],
			enrollCode: enrollCode,
			isCompleted: false,
		};

		setClassUpdating(true);
		const success = await ClassApi.updateClass(request);
		if (success) {
			message.success("Cập nhật lớp học thành công");
			onSuccess && onSuccess();
		} else {
			message.error("Cập nhật lớp học thất bại");
		}
		setClassUpdating(false);
		onCancel();
	};

	return (
		<BaseModal
			open={open}
			onCancel={onCancel}
			title="Cập nhật mã tham gia"
			onOk={() => formRef.current?.submit()}
			confirmLoading={classUpdating}
		>
			<Form
				ref={formRef}
				layout="vertical"
				onFinish={handleUpdateClass}
				initialValues={{
					// className: data?.className,
					enrollCode: data?.enrollCode,
					// dates: [dayjs(data?.startTime), dayjs(data?.endTime)],
				}}
			>
				{/* <Form.Item
					name="className"
					label="Tên lớp học"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tên lớp học",
						},
					]}
				>
					<Input placeholder="Nhập tên lớp học..." />
				</Form.Item> */}
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
					<Input.Password place holder="Nhập mã tham gia..." />
				</Form.Item>
				{/* <Form.Item
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
						format={"DD/MM/YYYY"}
						disabledDate={(date) => date.isBefore(moment().subtract(1, "days"))}
					/>
				</Form.Item> */}
			</Form>
		</BaseModal>
	);
};
