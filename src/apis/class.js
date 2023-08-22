import BaseApi from ".";

const resource = "Class";

const createClass = async (data) => {
	try {
		const response = await BaseApi.post(`/${resource}/CreateClass`, data);
		return response.status === 200;
	} catch (error) {
		console.log("Error create class: ", error);
		return false;
	}
};

const enrollClass = async (classId, enrollCode) => {
	try {
		const response = await BaseApi.post(`/${resource}/EnrollClass`, {
			classId,
			enrollCode,
		});
		return response.status === 200;
	} catch (error) {
		console.log("Error enroll class: ", error);
		return false;
	}
};

const searchClass = async (courseId, keyword) => {
	try {
		const response = await BaseApi.get(`/${resource}/SearchClass`, {
			params: {
				courseId: courseId,
				searchText: keyword,
			},
		});
		return response.data;
	} catch (error) {
		console.log("Error search class: ", error);
		return [];
	}
};

const getClassById = async (id) => {
	try {
		const response = await BaseApi.get(`/${resource}/GetClassByID/${id}`);
		return response.data;
	} catch (error) {
		console.log("Error get class by id: ", error);
		return undefined;
	}
};

const getClassStudents = async (classId) => {
	try {
		const response = await BaseApi.get(`/${resource}/GetUsersInClass`, {
			params: {
				classId: classId,
			},
		});
		return response.data;
	} catch (error) {
		console.log("Error get class students: ", error);
		return undefined;
	}
};

const deleteClass = async (id) => {
	try {
		const response = await BaseApi.delete(`/${resource}/DeleteClass/${id}`);
		return response.status === 200;
	} catch (error) {
		console.log("Error delete class: ", error);
		return false;
	}
};
const getUserInClass = async (id) => {
	try {
		const response = await BaseApi.get(`/${resource}/GetUsersInClass?classId=${id}`);
		return response.status === 200;
	} catch (error) {
		console.log("Error get student in class: ", error);
		return false;
	}
};

const ClassApi = {
	enrollClass,
	createClass,
	searchClass,
	getClassById,
	getClassStudents,
	deleteClass,
	getUserInClass,
};

export default ClassApi;
