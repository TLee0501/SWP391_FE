import { Col, Row, Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";
import TeamApi from "../../../apis/team";
import { ALL_PERMISSIONS } from "../../../constants/app";
import { TeamRequestStatus } from "../../../constants/enum";
import { usePermissions } from "../../../hooks/permission";
import { ClassSelect } from "../../project/components/ClassSelect";
import { TeamRequestDetailModal } from "../components/TeamRequestDetailModal";
import { TeamRequestList } from "./components/TeamRequestList";

export const TeamListPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const permissions = usePermissions();
	const canView = permissions?.includes(ALL_PERMISSIONS.team.view);

	const [showTeamRequestModal, setShowTeamRequestModal] = useState(false);

	const [teamLoading, setTeamLoading] = useState(false);
	const [teamRequests, setTeamRequests] = useState([]);

	const teamRequestRef = useRef();

	const statusOptions = [
		{
			label: "Chờ duyệt",
			value: TeamRequestStatus.pending,
		},
		{
			label: "Đã duyệt",
			value: TeamRequestStatus.approved,
		},
		{
			label: "Từ chối",
			value: TeamRequestStatus.denied,
		},
	];

	const getTeamRequests = async (classId) => {
		setTeamLoading(true);
		var data = await TeamApi.getProjectTeamRequests(classId);

		const searchStatus = searchParams.get("status");
		if (searchStatus !== undefined && searchStatus != null) {
			data = data.filter((e) => e.status === parseInt(searchStatus));
		}

		setTeamRequests(data);
		setTeamLoading(false);
	};

	const onLoadClasses = (classList) => {
		if (!classList || classList.length <= 0) return;
		searchParams.set("class", classList[0]?.classId);
		setSearchParams(searchParams);
	};
	const handleChangeClass = (classId) => {
		searchParams.set("class", classId);
		setSearchParams(searchParams);
	};

	const handleClickTeamRequest = (request) => {
		teamRequestRef.current = request;
		setShowTeamRequestModal(true);
	};

	useEffect(() => {
		const classId = searchParams.get("class");
		getTeamRequests(classId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	return (
		<div>
			{canView && (
				<>
					<Row>
						<Col span={12}>
							<span className="mr-2">Lớp học:</span>
							<ClassSelect
								value={searchParams.get("class")}
								onLoaded={onLoadClasses}
								onChange={handleChangeClass}
							/>
							<span className="mr-2 ml-4">Trạng thái:</span>
							<Select
								allowClear
								placeholder="Chọn trạng thái"
								options={statusOptions}
								onChange={(status) => {
									if (status === undefined) {
										searchParams.delete("status");
									} else {
										searchParams.set("status", status);
									}
									setSearchParams(searchParams);
								}}
							/>
						</Col>
					</Row>
					<div className="mb-4"></div>
					<Spin spinning={teamLoading}>
						<TeamRequestList
							teamRequests={teamRequests}
							onClickItem={handleClickTeamRequest}
							reload={() => {
								const classId = searchParams.get("class");
								getTeamRequests(classId);
							}}
						/>
					</Spin>
				</>
			)}
			<TeamRequestDetailModal
				teamRequest={teamRequestRef.current}
				open={showTeamRequestModal}
				onCancel={() => setShowTeamRequestModal(false)}
			/>
		</div>
	);
};
