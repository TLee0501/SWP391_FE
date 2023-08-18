import { Button, Card, Descriptions, Typography } from "antd";
import React from "react";
import { formatDate } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { ALL_PERMISSIONS } from "../../../../constants/app";
import { Delete } from "@icon-park/react";
import { usePermissions } from "../../../../hooks/permission";

const { Text } = Typography;

export const ClassItem = ({ data, onDelete }) => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const canDelete = permissions.includes(ALL_PERMISSIONS.class.delete);

  const items = [
    {
      key: "1",
      label: "Ngày bắt đầu",
      children: formatDate(data.startTime, "DD/MM/yyyy"),
    },
    {
      key: "2",
      label: "Ngày kết thúc",
      children: formatDate(data.endTime, "DD/MM/yyyy"),
    },
  ];

  const handleClick = () => {
    navigate(data.classId);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(data);
  };

  return (
    <Card
      className="w-full cursor-pointer"
      hoverable
      title={
        <Text className="text-base">
          <span className="font-light">Lớp</span> {data.className}
        </Text>
      }
      onClick={handleClick}
    >
      <Descriptions layout="vertical" items={items} />
      <Descriptions
        items={[
          {
            label: "Môn học",
            children: `${data.courseCode} - ${data?.courseName}`,
          },
        ]}
      />
      {canDelete && (
        <Button
          className="flex-center"
          icon={<Delete size={"20px"}></Delete>}
          danger
          type="text"
          onClick={handleDelete}
        />
      )}
    </Card>
  );
};
