import { Delete } from "@icon-park/react";
import { Button, Card, Row, Typography } from "antd";
import React from "react";
import { usePermissions } from "../../../../hooks/permission";
import { ALL_PERMISSIONS } from "../../../../constants/app";

const { Text } = Typography;

export const TeamItem = ({ course, onDelete, onUpdate }) => {
	const permissions = usePermissions();
	const canDelete = permissions.includes(ALL_PERMISSIONS.team.delete);

	const handleUpdate = () => {
		onUpdate(course);
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		onDelete(course);
	};

	return (
		<Card className="w-full cursor-pointer" hoverable onClick={handleUpdate}>
			<Row justify="space-between">
				<div>
					<Text className="text-lg font-medium" ellipsis>
						{course.teamName}
					</Text>
				</div>
				{canDelete && (
					<Button
						className="flex-center"
						icon={<Delete />}
						danger
						type="text"
						onClick={handleDelete}
					/>
				)}
			</Row>
		</Card>
	);
};
