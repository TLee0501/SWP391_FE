import { Delete } from "@icon-park/react";
import { Button, Card, Row, Tag, Typography } from "antd";
import React from "react";

const { Text } = Typography;

export const CourseItem = ({ course, onDelete, onUpdate }) => {
  const handleUpdate = () => {
    onUpdate(course);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(course);
  };

  return (
    <Card className="w-full cursor-pointer" hoverable onClick={handleUpdate}>
      <Row justify="space-between">
        <div>
          <Text className="text-lg font-medium" ellipsis>
            [{course.code}] {course.name}
          </Text>
          <Tag
            className="ml-2"
            color={course.active ? "blue-inverse" : "default"}
          >
            {course.active ? "Hoạt động" : "Chưa hoạt động"}
          </Tag>
        </div>
        <Button
          className="flex-center"
          icon={<Delete />}
          danger
          type="text"
          onClick={handleDelete}
        />
      </Row>
    </Card>
  );
};
