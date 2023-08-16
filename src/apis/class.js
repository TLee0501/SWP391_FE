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

const ClassApi = {
	createClass,
};

export default ClassApi;
