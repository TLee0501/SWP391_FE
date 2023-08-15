import { Card, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const ProjectItem = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(project.id);
  };

  return (
    <Card className="w-full" hoverable onClick={handleClick}>
      <Row justify="space-between" align="middle">
        <Title ellipsis style={{ margin: 0 }} level={5}>
          {project.name}
        </Title>
      </Row>
    </Card>
  );
};
