import { Collapse, Descriptions, Divider, Drawer, Typography } from "antd";
import React from "react";
import { TextTile } from "../../../../components/TextTile";
import { TeacherFeedback } from "./TeacherFeedback";

const { Title } = Typography;

export const ReportDetailDrawer = ({ reportId, open, onCancel }) => {
	return (
		<Drawer
			open={open}
			onClose={onCancel}
			maskClosable={false}
			title="Báo cáo"
			placement="right"
			size="large"
		>
			<Descriptions
				items={[{ label: "Sinh viên báo cáo", children: "Nguyễn Văn A" }]}
			/>
			<Descriptions
				items={[{ label: "Giáo viên nhận báo cáo", children: "Trần Văn C" }]}
			/>
			<TextTile label="Tiêu đề" colon>
				<div className="mt-1">-</div>
			</TextTile>
			<Divider />
			<TextTile label="Báo cáo chung" colon>
				<div className="mt-1">-</div>
			</TextTile>
			<Divider />
			<TextTile label="Công việc đã làm" colon>
				<div className="mt-1">-</div>
			</TextTile>
			<Divider />
			<TextTile label="Công việc đang làm" colon>
				<div className="mt-1">-</div>
			</TextTile>
			<Divider />
			<TextTile label="Công việc dự định làm" colon>
				<div className="mt-1">-</div>
			</TextTile>
			<Divider />
			<TextTile label="Tệp đính kèm" colon>
				<div className="mt-1">-</div>
			</TextTile>
			<Divider />
			<Collapse
				ghost
				items={[
					{
						label: <Title level={5}>Phản hồi của giáo viên (1)</Title>,
						children: (
							<div>
								<TeacherFeedback />
							</div>
						),
					},
				]}
			/>
		</Drawer>
	);
};
