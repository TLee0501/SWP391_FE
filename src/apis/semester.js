import BaseApi from ".";

const resource = "Semesters";

const getSemesters = async () => {
	try {
		const response = await BaseApi.get(`/${resource}/GetSemesterList`);
		return response.data;
	} catch (error) {
		console.log("Error get semesters: ", error);
		return [];
	}
};

const getSemesterById = async (id) => {
	try {
		const response = await BaseApi.get(`/${resource}/GetSemester/${id}`);
		return response.data;
	} catch (error) {
		console.log("Error get semester by id: ", error);
		return undefined;
	}
};

const createSemester = async (data) => {
	try {
		const response = await BaseApi.post(`/${resource}/CreateSemester`, data);
		return response.status === 200;
	} catch (error) {
		console.log("Error create semester: ", error);
		return false;
	}
};

const updateSemester = async (id, data) => {
	try {
		const response = await BaseApi.put(
			`/${resource}/UpdateSemester/${id}`,
			data
		);
		return response.status === 200;
	} catch (error) {
		console.log("Error update semester: ", error);
		return false;
	}
};

const SemesterApi = {
	getSemesters,
	getSemesterById,
	updateSemester,
	createSemester,
};

export default SemesterApi;
