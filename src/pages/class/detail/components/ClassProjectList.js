import React, { useContext, useEffect, useRef, useState } from "react";
import { ClassDetailArea } from "../../components/ClassDetailArea";
import { ClassContext } from "../../../../providers/class";
import {
	Button,
	Card,
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
import ClassApi from "../../../../apis/class";
import TeamRequestApi from "../../../../apis/team";

const { Text } = Typography;

export const ClassProjectList = ({ onViewDescription }) => {
	const data = useContext(ClassContext);
	const permissions = usePermissions();
	const canCreateProject = permissions?.includes(
		ALL_PERMISSIONS.project.create,
	);
	const canRegisterTeamRequest = permissions?.includes(
		ALL_PERMISSIONS.team.create,
	);
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState([]);
	const [projectCreating, setProjectCreating] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showCreateTeamRequestModal, setShowCreateTeamRequestModal] =
		useState(false);
	const [teamRequestCreating, setTeamRequestCreating] = useState(false);

	const projectIdRef = useRef();

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

	const getStudents = async (classId) => {
		setLoading(true);
		const result = await ClassApi.getClassStudents(classId);
		setStudents(result);
		setLoading(false);
	};

	useEffect(() => {
		const { classId } = data;
		if (!classId) return;

		getStudents(classId);
	}, [data]);

	const handleCloseCreateModal = () => {
		setShowCreateModal(false);
	};

	const handleCreateTeamRequest = (request) => {
		setTeamRequestCreating(true);

		const { classId, projectId, teamName, listStudent } = request;
		const data = {
			classId: classId,
			projectId: projectId,
			teamName: teamName,
			listStudent: listStudent,
		};

		TeamRequestApi.createTeamRequest(data).then(({ success, data }) => {
			if (success) {
				message.success(data);
				handleCloseCreateModal();
			} else {
				message.error(data);
			}
			setTeamRequestCreating(false);
		});
	};

	const renderItem = (item) => {
		return (
			<List.Item>
				<Card className="w-full">
					<Row justify="space-between" align="middle">
						<Text>{item.projectName}</Text>
						<Row>
							{canRegisterTeamRequest && <Button
								type="link"
								className="mr-2"
								onClick={() => {
									projectIdRef.current = item.projectId;
									setShowCreateTeamRequestModal(true);
								}}
							>
								Đăng ký
							</Button>
							}
							<Button type="text" onClick={() => onViewDescription(item)}>
								Xem mô tả
							</Button>
						</Row>
					</Row>
				</Card>
			</List.Item>
		);
	};

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
				confirmLoading={teamRequestCreating}
				Students={students}
				Projects={projects}
				onSubmit={handleCreateTeamRequest}
				projectId={projectIdRef.current}
				classId={data.classId}
			/>
		</ClassDetailArea>
	);
};
