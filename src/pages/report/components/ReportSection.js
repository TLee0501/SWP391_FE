import { PreviewOpen, Send } from "@icon-park/react";
import { Button, Card, Col, Empty, Row, Tag, Typography } from "antd";
import React from "react";
import { formatDate } from "../../../utils";
import moment from "moment";

const { Text } = Typography;

export const ReportSection = ({ report, onSendReport, onViewReport }) => {
	const isOverdue = moment().isAfter(report?.endTime);
	const canSubmitReport =
		moment().isBetween(report?.startTime, report?.endTime) && !isOverdue;
	const canViewReport = true;

	return (
		<Card
			className="w-full"
			title={
				<Text style={{ fontWeight: 400 }}>
					{`Báo cáo lần ${(report?.index ?? 0) + 1}`}{" "}
					<strong>
						({formatDate(report?.startTime, "DD/MM/YYYY")} -{" "}
						{formatDate(report?.endTime, "DD/MM/YYYY")})
					</strong>
					{isOverdue && (
						<Tag color="red" className="ml-4">
							Đã quá hạn nộp báo cáo
						</Tag>
					)}
				</Text>
			}
			extra={
				<Row>
					<Col>
						{canViewReport && (
							<Button
								type="link"
								className="w-full flex-center"
								icon={<PreviewOpen />}
								onClick={() => onViewReport(report)}
							>
								Xem báo cáo
							</Button>
						)}
					</Col>
					<Col>
						{canSubmitReport && (
							<Button
								type="link"
								className="w-full flex-center"
								icon={<Send />}
								onClick={() => onSendReport(report)}
							>
								Nộp báo cáo
							</Button>
						)}
					</Col>
				</Row>
			}
		>
			{report?.content ? (
				<div>{report?.content}</div>
			) : (
				<Empty description={<Text disabled>Chưa có nội dung</Text>} />
			)}
		</Card>
	);
};
