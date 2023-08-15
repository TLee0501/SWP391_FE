import { List } from "antd";
import React from "react";
import { ProjectItem } from "./ProjectItem";

export const ProjectList = ({ projects }) => {
  const renderItem = (item) => {
    return (
      <List.Item>
        <ProjectItem project={item} />
      </List.Item>
    );
  };

  return (
    <List
      dataSource={projects}
      renderItem={renderItem}
      rowKey={(item) => item.id}
    />
  );
};
