import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockProjects } from "../../../apis/project";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { Card, Typography } from "antd";

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
    <BasePageContent title={project?.name}>
      <Card title="Mô tả dự án" className="mt-4">
        <Paragraph>{project.description}</Paragraph>
      </Card>
    </BasePageContent>
  );
};

export default ProjectDetailPage;
