import BaseApi from ".";

const login = async (email, password) => {
	const response = await BaseApi.post("/Users/Login", {
		mail: email,
		password: password,
	}).catch(function (error){
		console.log('Wrong email or password', error) 
		return false;
	});
  return response.status;
};

const getUserbyId = async (userId) => {
	const response = await BaseApi.get("/Users/GetUser", {
		userId: userId,
	}).catch(function (error){
		console.log('Wrong userId ', error) 
		return false;
	});
  return response.status;
};

const AuthApi = {
  login,
  getUserbyId
};

export default AuthApi;
