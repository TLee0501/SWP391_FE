import { Card, Descriptions } from "antd";
import React, { useContext } from "react";
import { ClassContext } from "../../../../providers/class";
import { formatDate } from "../../../../utils";
import { SemesterTypeContext } from "../../../../providers/semesterType";

export const SemesterBasicInfo = () => {
    // const role = useRole();
    const { data } = useContext(SemesterTypeContext);
    // const semester = data?.semester;

    const items = [
        {
            key: "SEMESTER",
            label: "Học kỳ",
            children: `${data?.name}`,
        },
        {
            key: "START_DATE",
            label: "Ngày bắt đầu",
            children: formatDate(data?.startTime, "DD/MM/yyyy"),
        },
        {
            key: "END_DATE",
            label: "Ngày kết thúc",
            children: formatDate(data?.endTime, "DD/MM/yyyy"),
        },
    ];

    return (
        <Card className="mt-3 mb-4" title="Thông tin cơ bản">
            <Descriptions layout="vertical" items={items} />
        </Card>
    );
};
