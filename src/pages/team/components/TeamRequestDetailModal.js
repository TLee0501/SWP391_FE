import React from "react";
import BaseModal from "../../../components/BaseModal";
import { Button, Col, List, Row, Typography } from "antd";
import { Check, Forbid } from "@icon-park/react";

const { Text, Title } = Typography;

export const TeamRequestDetailModal = ({ open, onCancel, teamRequest }) => {
	const renderMemberItem = (user) => {
		return <List.Item>{user.fullName}</List.Item>;
	};

	return (
		<BaseModal
			okButtonProps={{ style: { display: "none" } }}
			cancelButtonProps={{ style: { display: "none" } }}
			open={open}
			onCancel={onCancel}
			title="Yêu cầu đăng ký nhóm"
		>
			<div>
				<Title level={5}>Dự án:</Title>
			</div>
			<div>
				<Text>{teamRequest?.projectName}</Text>
			</div>
			<div className="mt-4">
				<Title level={5}>Danh sách thành viên:</Title>
			</div>
			<List
				dataSource={teamRequest?.users}
				renderItem={renderMemberItem}
				className="mb-4"
			/>
			<Row gutter={8} justify="end">
				<Col>
					<Button className="flex-center" icon={<Check />} type="primary">
						Duyệt
					</Button>
				</Col>
				<Col>
					<Button icon={<Forbid />} className="flex-center" danger>
						Từ chối
					</Button>
				</Col>
			</Row>
		</BaseModal>
	);
};
