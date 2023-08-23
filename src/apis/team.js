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

const TeamApi = {
	getProjectTeamRequests,
};

export default TeamApi;
