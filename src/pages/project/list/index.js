import { Plus } from "@icon-park/react";
import { Button, Input, Row } from "antd";
import React from "react";

const ProjectListPage = () => {
	return (
		<div>
			<Row justify="space-between">
				<Input.Search placeholder="Tìm dự án..." className="w-1/2" />
				<Button className="flex-center" type="primary" icon={<Plus />}>
					Thêm dự án
				</Button>
			</Row>
		</div>
	);
};

export default ProjectListPage;
