import React, { useContext } from "react";
import { TeamContext } from "../../../../providers/team";
import { Card } from "antd";
import { TextTile } from "../../../../components/TextTile";
import { RawHtml } from "../../../../components/RawHtml";

export const TeamProjectInfo = () => {
	const { team } = useContext(TeamContext);

	return (
		<Card title={`Dự án: ${team?.project.name}`}>
			<TextTile label="Mô tả" colon>
				<RawHtml html={team?.project.description} />
			</TextTile>
			<TextTile className="mt-4" label="Yêu cầu chức năng (Functional)" colon>
				{team?.project.functionalReq}
			</TextTile>
			<TextTile
				className="mt-4"
				label="Yêu cầu phi chức năng (Non-functional)"
				colon
			>
				{team?.project.nonfunctionalReq}
			</TextTile>
		</Card>
	);
};
