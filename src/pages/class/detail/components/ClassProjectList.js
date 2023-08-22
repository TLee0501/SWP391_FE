import React, { useContext, useEffect, useState } from "react";
import { ClassDetailArea } from "../../components/ClassDetailArea";
import { ClassContext } from "../../../../providers/class";
import {
	Button,
	Empty,
	List,
	Row,
	Spin,
	Typography,
	message,
} from "antd";
import ProjectApi from "../../../../apis/project";
import { Plus } from "@icon-park/react";
import { ProjectDetailModal } from "../../../project/components/ProjectDetailModal";
import { usePermissions } from "../../../../hooks/permission";
import { ALL_PERMISSIONS } from "../../../../constants/app";
import { CreateTeamRequest } from "./CreateTeamRequest";

const { Text } = Typography;

export const ClassProjectList = () => {
	const data = useContext(ClassContext);
	const permissions = usePermissions();
	const canCreateProject = permissions?.includes(
		ALL_PERMISSIONS.project.create,
		ALL_PERMISSIONS.team.create,
	);

	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(false);
	const [projectCreating, setProjectCreating] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showCreateTeamRequestModal, setShowCreateTeamRequestModal] =
		useState(false);
	const [teamRequestCreating, setTeamRequestCreating] = useState(false);

	const getProjectsInClass = async (classId) => {
		setLoading(true);
		const result = await ProjectApi.getProjects(classId);
		setProjects(result);
		setLoading(false);
	};

	const handleCreateProject = async (values) => {
		setProjectCreating(true);
		const { classId } = data;
		const success = await ProjectApi.createProject({ ...values, classId });
		if (success) {
			message.success("Tạo dự án thành công");
			getProjectsInClass(classId);
		} else {
			message.error("Tạo dự án thất bại");
		}
		setProjectCreating(false);
	};

	useEffect(() => {
		const { classId } = data;
		if (!classId) return;
		getProjectsInClass(classId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const handleCloseCreateTeamRequestModal = () => {
		setShowCreateTeamRequestModal(false);
		setTeamRequestCreating(false);
	};
	const renderItem = (item) => {
		return (
			<ClassDetailArea
				title="Danh sách dự án"
				defaultOpen
				action={
					canCreateProject && (
						<Row>
							<Button
								type="primary"
								icon={<Plus />}
								className="flex-center"
								onClick={(e) => {
									e.stopPropagation();
									setShowCreateModal(true);
								}}
							>
								Thêm dự án
							</Button>
							<Button
								type="primary"
								className="mr-2"
								onClick={() => setShowCreateTeamRequestModal(true)}
							>
								Đăng ký
							</Button>
						</Row>
					)
				}
			>
				<Spin spinning={loading}>
					<List
						dataSource={projects}
						renderItem={renderItem}
						locale={{
							emptyText: (
								<Empty description={<Text disabled>Chưa có dự án nào</Text>} />
							),
						}}
					/>
				</Spin>
				<ProjectDetailModal
					title="Thêm dự án"
					open={showCreateModal}
					onCancel={() => setShowCreateModal(false)}
					onSubmit={handleCreateProject}
					submitting={projectCreating}
				/>
				<CreateTeamRequest
					open={showCreateTeamRequestModal}
					title="Đăng ký nhóm và dự án"
					onCancel={handleCloseCreateTeamRequestModal}
					// onSubmit={handleAddCourse}
					confirmLoading={teamRequestCreating}
				/>
			</ClassDetailArea>
		);
	};
}
