import BaseApi from ".";

const login = async (email, password) => {
  const response = await BaseApi.post("/login", {
    email: email,
    password: password,
  });

  return response.data;
};

const AuthApi = {
  login,
};

export default AuthApi;
