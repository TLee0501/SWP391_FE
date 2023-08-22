import BaseApi from ".";

const resoure = "ProjectTeams";

const getTeamRequestById = async (id) => {
  try {
    const response = await BaseApi.post(
      `/${resoure}/GetTeamProjectRequests?classId=${id}`,
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
      `/${resoure}/StudentCreateTeamRequest`,
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

const TeamRequestApi = {
  getTeamRequestById,
  createTeamRequest,
};

export default TeamRequestApi;
