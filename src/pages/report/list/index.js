import React, { useEffect, useState } from "react";
import { Spin, Typography } from "antd";
import { ProjectReportList } from "./components/ProjectReportList";
import { ClassSelect } from "../../project/components/ClassSelect";
import { useSearchParams } from "react-router-dom";
import TeamApi from "../../../apis/team";
const { Title, Text } = Typography;

const ProjectReportListPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [loading, setLoading] = useState(false);
	const [teams, setTeams] = useState([]);

	const getProjectTeams = async (classId) => {
		setLoading(true);
		const list = await TeamApi.getProjectTeamInClass(classId);
		setTeams(list);
		setLoading(false);
	};

	useEffect(() => {
		const classId = searchParams.get("class");
		if (classId) {
			getProjectTeams(classId);
		}
	}, [searchParams]);

	return (
		<div>
			<Title level={4}>Các dự án đang làm của sinh viên</Title>
			<div className="mb-4">
				<span className="mr-2">Lớp học:</span>
				<ClassSelect
					value={searchParams.get("class")}
					onLoaded={(data) => {
						if (data && data.length > 0) {
							const { classId } = data[0];
							searchParams.set("class", classId);
							setSearchParams(searchParams);
						}
					}}
					onChange={(value) => {
						if (value === undefined) {
							searchParams.delete("class");
						} else {
							searchParams.set("class", value);
						}
						setSearchParams(searchParams);
					}}
				/>
			</div>
			<Spin spinning={loading}>
				<ProjectReportList teams={teams} />
			</Spin>
		</div>
	);
};

export default ProjectReportListPage;
