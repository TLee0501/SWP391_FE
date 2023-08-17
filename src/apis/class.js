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

const searchClass = async (courseId, keyword) => {
	try {
		var queries = [];
		if (courseId) {
			queries.push(`courseId=${courseId}`);
		}
		if (keyword) {
			queries.push(`searchText=${keyword}`);
		}

		const query = queries.length > 0 ? `?${queries.join("&")}` : "";

		const response = await BaseApi.get(`/${resource}/SearchClass${query}`);
		return response.data;
	} catch (error) {
		console.log("Error search class: ", error);
		return [];
	}
};

const getAllClasses = async (courseId) => {
	try {
		var queries = [];
		if (courseId) {
			queries.push(`courseId=${courseId}`);
		}

		const query = queries.length > 0 ? `?${queries.join("&")}` : "";

		const response = await BaseApi.get(`/${resource}/GetAllClasses${query}`);
		return response.data;
	} catch (error) {
		console.log("Error get all classes: ", error);
		return [];
	}
};

const ClassApi = {
	createClass,
	searchClass,
	getAllClasses,
};

export default ClassApi;
