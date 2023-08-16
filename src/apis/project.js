import BaseApi from ".";

const resource = "Projects";

const createProject = async (data) => {
	try {
		const response = await BaseApi.post(`/${resource}/CreateProject`, data);
		return response.status === 200;
	} catch (error) {
		console.log("Error create project: ", error);
		return false;
	}
};

const updateProject = async (data) => {
	try {
		const response = await BaseApi.put(`/${resource}/UpdateProject`, data);
		return response.status === 200;
	} catch (error) {
		console.log("Error update project: ", error);
		return false;
	}
};

const ProjectApi = {
	createProject,
	updateProject,
};

export default ProjectApi;
