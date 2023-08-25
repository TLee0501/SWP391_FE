import { Delete, Edit } from "@icon-park/react";
import { Button, Card, Col, Row, Typography } from "antd";
import React from "react";
import { MemberTaskList } from "./MemberTaskList";

const { Text } = Typography;

export const TaskItem = ({
	task,
	onClick,
	onDelete,
	onAssignMember,
	onUnAssignMember,
}) => {
	return (
		<Card className="w-full">
			<Row justify="space-between" align="middle">
				<Col>
					<div className="mb-3">
						<Text style={{ fontWeight: 600 }}>{task.taskName}</Text>
					</div>
					<div>
						<Text>Thành viên làm:</Text>
						<div className="mb-2"></div>
						<MemberTaskList
							assignedMembers={task?.members}
							taskId={task?.taskId}
							onAssign={() => {
								onAssignMember && onAssignMember();
							}}
							onUnAssign={onUnAssignMember}
						/>
					</div>
				</Col>
				<Col>
					<Row gutter={8}>
						<Col>
							<Button
								icon={<Edit />}
								className="flex-center"
								onClick={() => onClick(task)}
							/>
						</Col>
						<Col>
							<Button
								onClick={(e) => {
									e.stopPropagation();
									onDelete(task);
								}}
								className="flex-center"
								icon={<Delete />}
								danger
								type="text"
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</Card>
	);
};
