import React from "react";
import { ClassDetailArea } from "../../components/ClassDetailArea";
import { StudentList } from "./StudentList";
import { mockStudents } from "../../../../__mocks__/account";

export const ClassStudentList = () => {
	return (
		<ClassDetailArea title="Danh sách sinh viên" defaultOpen>
			<StudentList students={mockStudents} />
		</ClassDetailArea>
	);
};
