import BaseApi from ".";

const resource = "ProjectTeams";

const getProjectTeamRequests = async (classId) => {
	try {
		const response = await BaseApi.get(`/${resource}/GetTeamProjectRequests`, {
			params: {
				classId,
			},
		});
		return response.data;
	} catch (error) {
		console.log("Error get project team requests: ", error);
		return [];
	}
};

const getTeamRequestById = async (id) => {
	try {
		const response = await BaseApi.post(
			`/${resource}/GetTeamProjectRequests?classId=${id}`,
			{
				params: {
					classId: id,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log("Error search class: ", error);
		return [];
	}
};

const createTeamRequest = async (request) => {
	try {
		const response = await BaseApi.post(
			`/${resource}/StudentCreateTeamRequest`,
			request
		);
		return {
			success: response.status === 200,
			data: response.data,
		};
	} catch (error) {
		console.log("Error create team request: ", error);
		return {
			success: false,
			data: error.response.data,
		};
	}
};

const TeamApi = {
	getProjectTeamRequests,
	getTeamRequestById,
	createTeamRequest,
};

export default TeamApi;
