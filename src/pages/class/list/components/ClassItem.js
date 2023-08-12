import { Card, Descriptions, Typography } from "antd";
import React from "react";
import { formatDate } from "../../../../utils";

const { Text } = Typography;

export const ClassItem = ({ data }) => {
  const items = [
    {
      key: "1",
      label: "Bắt đầu",
      children: formatDate(data.startDate, "DD/MM/yyyy"),
    },
    {
      key: "2",
      label: "Kết thúc",
      children: formatDate(data.endDate, "DD/MM/yyyy"),
    },
  ];

  return (
    <Card className="w-full cursor-pointer" hoverable title={data.name}>
      <Descriptions layout="vertical" items={items} />
    </Card>
  );
};
