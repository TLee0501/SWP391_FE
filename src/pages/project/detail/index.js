import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { Button, Card, Row, Typography } from "antd";
import { mockProjects } from "../../../__mocks__/project";

const { Paragraph } = Typography;

const ProjectDetailPage = () => {
	const { id } = useParams();

	const [project, setProject] = useState({});

	useEffect(() => {
		const data = mockProjects.find((e) => e.id === id);
		if (data) {
			setProject(data);
		}
	}, [id]);

	return (
		<BasePageContent
			title={
				<span>
					{project?.name} <span></span>
				</span>
			}
		>
			<Card title="Mô tả dự án" className="mt-4">
				<Paragraph>{project.description}</Paragraph>
			</Card>
			<Row className="mt-4">
				<Button type="primary" className="mr-2">
					Cập nhật
				</Button>
				<Button danger>Xóa</Button>
			</Row>
		</BasePageContent>
	);
};

export default ProjectDetailPage;
