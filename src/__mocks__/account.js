import { roles } from "../constants/app";

export const mockAccounts = [
	{
		id: "1",
		fullName: "Nguyen Van A",
		email: "abc@gmail.com",
		role: roles.ADMIN,
		active: true,
	},
	{
		id: "2",
		fullName: "Nguyen Van B",
		email: "def@gmail.com",
		role: roles.TEACHER,
		active: true,
	},
	{
		id: "3",
		fullName: "Nguyen Van C",
		email: "xyz@gmail.com",
		role: roles.STUDENT,
		active: false,
	},
];

export const mockStudents = [
	{
		id: "3",
		fullName: "Nguyễn Thanh Huyền",
		email: "huyenthanh@fpt.edu.com",
		role: roles.STUDENT,
		active: true,
		team: {
			name: "Nhóm 1",
			members: [
				{
					name: "Trần Hạo Nam",
				},
				{
					name: "Bùi Văn Công",
				},
			],
		},
	},
	{
		id: "4",
		fullName: "Trần Vĩnh Phát",
		email: "phatvinh@fpt.edu.com",
		role: roles.STUDENT,
		active: true,
	},
	{
		id: "5",
		fullName: "Lê Văn Vũ",
		email: "vule@fpt.edu.com",
		role: roles.STUDENT,
		active: true,
	},
];
