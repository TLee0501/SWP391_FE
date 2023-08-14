import { roles } from "../constants/app";

export const mockAccounts = [
	{
		id: "1",
		fullName: "Nguyen Van A",
		email: "abc@gmail.com",
		phoneNumber: "0385345678",
		address: "Address 01",
		role: roles.ADMIN,
	},
	{
		id: "2",
		fullName: "Nguyen Van B",
		email: "def@gmail.com",
		phoneNumber: "0385345671",
		address: "Address 02",
		role: roles.TEACHER,
	},
	{
		id: "3",
		fullName: "Nguyen Van C",
		email: "xyz@gmail.com",
		phoneNumber: "0385345679",
		address: "Address 03",
		role: roles.STUDENT,
	},
];
