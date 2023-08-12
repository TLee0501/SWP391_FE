import BaseApi from ".";

const login = async (email, password) => {
	const response = await BaseApi.post("/Users/Login", {
		mail: email,
		password: password,
	}).catch(function (error){
		console.log('ERROR: ', error) 
		return false;
	});
  return response.status;
};

const getUserbyID = async (userID) => {
	const response = await BaseApi.get("/Users/GetUser", {
		userID: userID,
	}).catch(function (error){
		console.log('ERROR: ', error) 
		return false;
	});
  return response.status;
};

const AuthApi = {
  login,
  getUserbyID
};

export default AuthApi;
