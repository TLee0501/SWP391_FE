import { Edit, Setting } from "@icon-park/react";
import { Button, Dropdown, Row, Spin, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClassApi from "../../../apis/class";
import ProjectApi from "../../../apis/project";
import { ConfirmDeleteModal } from "../../../components/ConfirmDeleteModal";
import { ALL_PERMISSIONS, roles } from "../../../constants/app";
import { usePermissions } from "../../../hooks/permission";
import { useRole } from "../../../hooks/role";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { ClassProvider } from "../../../providers/class";
import { ProjectDescriptionModal } from "../../project/components/ProjectDescriptionModal";
import { ProjectDetailModal } from "../../project/components/ProjectDetailModal";
import { ClassBasicInfo } from "./components/ClassBasicInfo";
import { ClassProjectList } from "./components/ClassProjectList";
import { ClassStudentList } from "./components/ClassStudentList";
import { ClassTeamList } from "./components/ClassTeamList";
import { EnrollClassModal } from "./components/EnrollClassModal";
import { UpdateClassModal } from "./components/UpdateClassModal";

const ClassDetailPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const role = useRole();
	const permissions = usePermissions();
	const canEnroll = permissions?.includes(ALL_PERMISSIONS.class.enroll);
	const canSettings = permissions?.includes(ALL_PERMISSIONS.class.settings);

	const [data, setData] = useState({});
	const [loading, setLoading] = useState({});
	const [projectUpdating, setProjectUpdating] = useState(false);

	const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);
	const [showDeleteClassModal, setShowDeleteClassModal] = useState(false);

	const [showUpdateEClassModal, setShowUpdateClassModal] = useState(false);
	const [showEnrollClassModal, setShowEnrollClassModal] = useState(false);
	const [showProjectDescModal, setShowProjectDescModal] = useState(false);

	const projectRef = useRef();

	const settingItems = [
		{
			key: "UPDATE_CLASS",
			label: "Cập nhật lớp học",
			icon: <Edit size="20" />,

			onClick: () => setShowUpdateClassModal(true),
		},
		// {
		// 	key: "DELETE_CLASS",
		// 	label: "Xóa lớp",
		// 	icon: <Delete />,
		// 	danger: true,
		// 	onClick: () => setShowDeleteClassModal(true),
		// },
	];

	const getClass = async (handleLoading) => {
		if (handleLoading) {
			setLoading(true);
		}
		const response = await ClassApi.getClassById(id);
		if (response) {
			setData(response);
		}
		if (handleLoading) {
			setLoading(false);
		}
	};

	const handleUpdateProject = async (values) => {
		if (!id) return;

		setProjectUpdating(true);
		const {
			projectId,
			projectName,
			description,
			functionalReq,
			nonfunctionalReq,
		} = values;
		const data = {
			projectId,
			projectName,
			description,
			functionalReq,
			nonfunctionalReq,
		};
		const success = await ProjectApi.updateProject(data);
		if (success) {
			message.success("Cập nhật dự án thành công");
			getClass(true);
		} else {
			message.error("Cập nhật dự án thất bại");
		}
		setProjectUpdating(false);
		setShowUpdateProjectModal(false);
	};

	useEffect(() => {
		if (id) {
			getClass(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleViewProjectDescription = (item) => {
		projectRef.current = item;
		if (role === roles.TEACHER) {
			setShowUpdateProjectModal(true);
		} else {
			setShowProjectDescModal(true);
		}
	};

	const handleDeleteClass = async () => {
		if (!id) return;
		const success = await ClassApi.deleteClass(id);
		if (success) {
			message.success("Đã xóa lớp học");
			navigate(-1);
		} else {
			message.error("Xóa lớp học thất bại");
		}
		setShowDeleteClassModal(false);
	};

	return (
		<Spin spinning={loading}>
			<ClassProvider
				data={data}
				reload={(handleLoading) => getClass(handleLoading)}
			>
				<BasePageContent
					title={<span>{`Lớp ${data.className ?? ""}`} </span>}
					action={
						<Row>
							{canEnroll && (
								<Button
									type="primary"
									disabled={data?.enrolled}
									onClick={() => setShowEnrollClassModal(true)}
								>
									{data?.enrolled ? "Đã tham gia" : "Tham gia lớp học"}
								</Button>
							)}
							{canSettings && (
								<Dropdown menu={{ items: settingItems }}>
									<Button className="flex-center ml-2" icon={<Setting />} />
								</Dropdown>
							)}
						</Row>
					}
				>
					<ClassBasicInfo />
					{(data?.enrolled || role === roles.TEACHER) && (
						<ClassProjectList
							onViewDescription={handleViewProjectDescription}
						/>
					)}
					{role === roles.TEACHER && <ClassTeamList />}
					{role === roles.TEACHER && <ClassStudentList />}
					<UpdateClassModal
						open={showUpdateEClassModal}
						onCancel={() => setShowUpdateClassModal(false)}
						data={data}
						onSuccess={() => getClass(true)}
					/>
					<EnrollClassModal
						classId={data?.classId}
						open={showEnrollClassModal}
						onCancel={() => setShowEnrollClassModal(false)}
						onSuccess={() => getClass(true)}
					/>
					<ProjectDescriptionModal
						open={showProjectDescModal}
						project={projectRef.current}
						onCancel={() => setShowProjectDescModal(false)}
					/>
					<ProjectDetailModal
						title="Cập nhật dự án"
						open={showUpdateProjectModal}
						onCancel={() => setShowUpdateProjectModal(false)}
						onSubmit={handleUpdateProject}
						submitting={projectUpdating}
						edit={true}
						project={projectRef.current}
					/>
					<ConfirmDeleteModal
						title="Bạn muốn xóa lớp học này?"
						open={showDeleteClassModal}
						onCancel={() => setShowDeleteClassModal(false)}
						onOk={() => handleDeleteClass()}
					/>
				</BasePageContent>
			</ClassProvider>
		</Spin>
	);
};

export default ClassDetailPage;
