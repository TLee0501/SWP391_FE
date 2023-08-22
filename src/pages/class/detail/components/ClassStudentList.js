import { Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ClassApi from "../../../../apis/class";
import { ClassContext } from "../../../../providers/class";
import { ClassDetailArea } from "../../components/ClassDetailArea";
import { StudentList } from "./StudentList";

export const ClassStudentList = () => {
	const data = useContext(ClassContext);

	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);

	const getStudents = async (classId) => {
		setLoading(true);
		const result = await ClassApi.getClassStudents(classId);
		setStudents(result);
		setLoading(false);
	};

	useEffect(() => {
		const { classId } = data;
		if (!classId) return;

		getStudents(classId);
	}, [data]);

	return (
		<ClassDetailArea title="Danh sách sinh viên" defaultOpen>
			<Spin spinning={loading}>
				<StudentList students={students} />
			</Spin>
		</ClassDetailArea>
	);
};
