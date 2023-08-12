import { Down, Up } from "@icon-park/react";
import { Card, Row, Tag, Typography } from "antd";
import React from "react";

const { Text } = Typography;

export const ClassItem = ({ data }) => {
  return (
    <Card className="w-full cursor-pointer" hoverable>
      <Row justify="space-between">
        <div>
          <Text className="text-lg font-medium" ellipsis>
            {data.name}
          </Text>
          <Tag
            className="ml-2"
            color={data.active ? "blue-inverse" : "default"}
          >
            {data.active ? "Kích hoạt" : "Chưa kích hoạt"}
          </Tag>
        </div>
        {/* {!expanded ? <Down size={26} /> : <Up size={26} />} */}
      </Row>
    </Card>
  );
};
