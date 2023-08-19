import BaseApi from ".";

const resource = "Users";

export const searchUsers = async (keyword) => {
	try {
		const query = keyword ? `?txtSearch=${keyword}` : "";
		const response = await BaseApi.get(`/${resource}/SearchUser${query}`);
		return response.data;
	} catch (error) {
		console.log("Error search users: ", error);
		return [];
	}
};

const banUserbyID = async (userID) => {
	try {
		const response = await BaseApi.put(`/${resource}/BanUser/${userID}`);
		return response.status === 200;
	} catch (error) {
		console.log("Error ban user: ", error);
		return false;
	}
};

const unbanUserbyID = async (userID) => {
	try {
		const response = await BaseApi.put(`/${resource}/BanUser/${userID}`);
		return response.status === 200;
	} catch (error) {
		console.log("Error unban user: ", error);
		return false;
	}
};


const UserApi = {
	searchUsers,
	banUserbyID,
	unbanUserbyID,
};

export default UserApi;
