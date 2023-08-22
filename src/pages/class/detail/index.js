import { Key, Setting } from "@icon-park/react";
import { Button, Dropdown, Row, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ClassApi from "../../../apis/class";
import { ALL_PERMISSIONS, roles } from "../../../constants/app";
import { usePermissions } from "../../../hooks/permission";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { ClassProvider } from "../../../providers/class";
import { ClassBasicInfo } from "./components/ClassBasicInfo";
import { ClassStudentList } from "./components/ClassStudentList";
import { ClassTeamList } from "./components/ClassTeamList";
import { EnrollClassModal } from "./components/EnrollClassModal";
import { UpdateEnrollKeyModal } from "./components/UpdateEnrollKeyModal";
import { ClassProjectList } from "./components/ClassProjectList";
import { ProjectDescriptionModal } from "../../project/components/ProjectDescriptionModal";
import { useRole } from "../../../hooks/role";

const ClassDetailPage = () => {
	const { id } = useParams();

	const role = useRole();
	const permissions = usePermissions();
	const canEnroll = permissions?.includes(ALL_PERMISSIONS.class.enroll);
	const canSettings = permissions?.includes(ALL_PERMISSIONS.class.settings);

	const [data, setData] = useState({});
	const [loading, setLoading] = useState({});

	const [showUpdateEnrollKeyModal, setShowUpdateEnrollKeyModal] =
		useState(false);
	const [showEnrollClassModal, setShowEnrollClassModal] = useState(false);
	const [showProjectDescModal, setShowProjectDescModal] = useState(false);

	const projectRef = useRef();

	const settingItems = [
		{
			key: "ENROLL_KEY",
			label: "Cập nhật mã tham gia",
			icon: <Key />,
			onClick: () => setShowUpdateEnrollKeyModal(true),
		},
	];

	const getClass = async () => {
		setLoading(true);
		const response = await ClassApi.getClassById(id);
		if (response) {
			setData(response);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (id) {
			getClass();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleViewProjectDescription = (item) => {
		projectRef.current = item;
		setShowProjectDescModal(true);
	};

	return (
		<ClassProvider data={data}>
			<BasePageContent
				title={<span>{`Lớp ${data.className}`} </span>}
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
				<Spin spinning={loading}>
					<ClassBasicInfo />
					<ClassProjectList onViewDescription={handleViewProjectDescription} />
					{role === roles.TEACHER && <ClassTeamList />}
					{role === roles.TEACHER && <ClassStudentList />}
				</Spin>
				<UpdateEnrollKeyModal
					open={showUpdateEnrollKeyModal}
					onCancel={() => setShowUpdateEnrollKeyModal(false)}
					classId={data?.classId}
				/>
				<EnrollClassModal
					classId={data?.classId}
					open={showEnrollClassModal}
					onCancel={() => setShowEnrollClassModal(false)}
					onSuccess={() => getClass()}
				/>
				<ProjectDescriptionModal
					open={showProjectDescModal}
					project={projectRef.current}
					onCancel={() => setShowProjectDescModal(false)}
				/>
			</BasePageContent>
		</ClassProvider>
	);
};

export default ClassDetailPage;
