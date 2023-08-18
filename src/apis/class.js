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
		// var queries = [];
		// if (courseId) {
		// 	queries.push(`courseId=${courseId}`);
		// }
		// if (keyword) {
		// 	queries.push(`searchText=${keyword}`);
		// }

		// const query = queries.length > 0 ? `?${queries.join("&")}` : "";

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

const deleteClass = async (id) => {
	try {
	  const response = await BaseApi.delete(`/${resource}/DeleteClass/${id}`);
	  return response.status === 200;
	} catch (error) {
	  console.log("Error delete class: ", error);
	  return false;
	}
  };

const ClassApi = {
	createClass,
	searchClass,
	getClassById,
	deleteClass,
};

export default ClassApi;
