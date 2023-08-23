import { Empty, List, Typography } from "antd";
import React from "react";
import { TeamRequestItem } from "./TeamRequestItem";

const { Text } = Typography;

export const TeamRequestList = ({ teamRequests, onClickItem }) => {
	const renderItem = (item) => {
		return (
			<List.Item>
				<TeamRequestItem teamRequest={item} onClick={onClickItem} />
			</List.Item>
		);
	};

	return (
		<div>
			<List
				locale={{
					emptyText: (
						<Empty
							description={<Text disabled>Chưa có nhóm nào đăng ký.</Text>}
						/>
					),
				}}
				split={false}
				dataSource={teamRequests}
				renderItem={renderItem}
			/>
		</div>
	);
};
