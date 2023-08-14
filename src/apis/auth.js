import BaseApi from ".";

const login = async (email, password) => {
	try {
		const response = await BaseApi.post("/Users/Login", {
			email: email,
			password: password,
		});
		if (response.status === 200){
			const jwt = response.data['token'];
			localStorage.setItem("jwt", jwt);
			return true;
		}
	} catch (error) {
		console.log('Wrong email or password', error) 
		return false;
	}
};

const getUser = async () => {
	try {
		const response = await BaseApi.get("/Users/GetUser");	
		const user = response.data;
		return user;
	} catch (error) {
		console.log('Wrong userId', error) 
		return undefined;
	}
};

const AuthApi = {
  login,
  getUser
};

export default AuthApi;
