import React, { useState } from "react";
import BaseModal from "../../../components/BaseModal";
import { Button, Col, List, Row, Typography, message } from "antd";
import { Check, Forbid } from "@icon-park/react";
import TeamApi from "../../../apis/team";

const { Text, Title } = Typography;

export const TeamRequestDetailModal = ({ open, onCancel, teamRequest }) => {
	const [showAcceptTeamRequestModal, setShowAcceptTeamRequestModal] =
		useState(false);
	const [showRejectTeamRequestModal, setShowDenyTeamRequestModal] =
		useState(false);
	const [loading, setLoading] = useState(false);

	const getAcceptTeamRequest = async (teamId) => {
		setLoading(true);
		const result = await TeamApi.AcceptTeamRequest(teamId);
		setShowAcceptTeamRequestModal(result);
		setLoading(false);
	};

	const getDenyTeamRequest = async (teamId) => {
		setLoading(true);
		const result = await TeamApi.DenyTeamRequest(teamId);
		setShowDenyTeamRequestModal(result);
		setLoading(false);
	};

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
					<Button className="flex-center" icon={<Check />} type="primary" onClick={() => {
						getAcceptTeamRequest(teamRequest?.teamId);
						console.log(teamRequest?.teamId);
						setShowAcceptTeamRequestModal(true);
						message.success(`Duyệt thành công!`);
					}}>
						Duyệt
					</Button>
				</Col>
				<Col>
					<Button icon={<Forbid />} className="flex-center" danger onClick={() => {
						getDenyTeamRequest(teamRequest?.teamId);
						console.log(teamRequest?.teamId);
						setShowDenyTeamRequestModal(true);
						message.success(`Nhóm đã bị từ chối!`);
					}}>
						Từ chối
					</Button>
				</Col>
			</Row>
		</BaseModal>
	);
};
