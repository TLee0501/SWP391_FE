import { Tag } from "antd";
import React from "react";

export const MemberTaskItem = ({ member, onRemove }) => {
	return (
		<Tag
			color="geekblue"
			closable
			onClose={(e) => {
				e.stopPropagation();
				onRemove && onRemove(member);
			}}
		>
			{member.memberFullName}
		</Tag>
	);
};
