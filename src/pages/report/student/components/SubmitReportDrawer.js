import { Send, UploadOne } from "@icon-park/react";
import { Button, Descriptions, Drawer, Form, Input, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

export const SubmitReportDrawer = ({ open, onCancel }) => {
	const uploadProps = {
		action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
		onChange({ file, fileList }) {
			if (file.status !== "uploading") {
				console.log(file, fileList);
			}
		},
		defaultFileList: [
			{
				uid: "1",
				name: "xxx.png",
				status: "uploading",
				url: "http://www.baidu.com/xxx.png",
				percent: 33,
			},
			{
				uid: "2",
				name: "yyy.png",
				status: "done",
				url: "http://www.baidu.com/yyy.png",
			},
			{
				uid: "3",
				name: "zzz.png",
				status: "error",
				response: "Server Error 500",
				// custom error message to show
				url: "http://www.baidu.com/zzz.png",
			},
		],
	};

	return (
		<Drawer
			title="Nộp báo cáo"
			placement="right"
			size="large"
			open={open}
			onClose={onCancel}
			maskClosable={false}
		>
			<Descriptions
				items={[{ label: "Sinh viên báo cáo", children: "Nguyễn Văn A" }]}
			/>
			<Descriptions
				items={[{ label: "Giáo viên nhận báo cáo", children: "Trần Văn C" }]}
			/>
			<Form layout="vertical">
				<Form.Item
					name="title"
					label="Tiêu đề"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập tiêu đề",
						},
					]}
				>
					<Input placeholder="Nhập tiêu đề..." />
				</Form.Item>
				<Form.Item
					name="content"
					label="Báo cáo chung"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập nội dung báo cáo",
						},
					]}
				>
					<TextArea placeholder="Báo cáo tổng quan về tiến độ của nhóm..." />
				</Form.Item>
				<Form.Item
					name="completedTask"
					label="Công việc đã làm"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập công việc đã làm",
						},
					]}
				>
					<TextArea placeholder="Những công việc nhóm đã đạt được..." />
				</Form.Item>
				<Form.Item
					name="inProgressTask"
					label="Công việc đang làm"
					rules={[
						{
							required: true,
							message: "Vui lòng nhập công việc đang làm",
						},
					]}
				>
					<TextArea placeholder="Những công việc nhóm đang làm..." />
				</Form.Item>
				<Form.Item name="todoTask" label="Công việc dự định làm">
					<TextArea placeholder="Những công việc nhóm đang làm..." />
				</Form.Item>
				<Form.Item name="files" label="Tệp đính kèm">
					<Upload {...uploadProps}>
						<Button className="flex-center" icon={<UploadOne />}>
							Tải tệp lên
						</Button>
					</Upload>
				</Form.Item>
				<Button
					icon={<Send />}
					className="flex-center"
					htmlType="submit"
					type="primary"
				>
					Gửi báo cáo
				</Button>
			</Form>
		</Drawer>
	);
};
