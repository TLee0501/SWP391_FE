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

const UserApi = {
	searchUsers,
};

export default UserApi;
