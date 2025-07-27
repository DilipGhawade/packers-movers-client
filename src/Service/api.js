import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApi = {
  // register a new user

  register: async (userData) => {
    console.log(
      `user registration called and the userdata is : ${JSON.stringify(
        userData
      )}`
    );

    try {
      const response = await api.post("/users/register", userData);

      console.log(`the response form server is : ${JSON.stringify(response)}`);

      return response;
    } catch (error) {
      console.error(
        `Error occured while registering the user Error : ${error.message}`
      );

      throw error;
    }
  },

  login: async (credentials) => {
    console.log(
      `login called and credentials is  : ${JSON.stringify(credentials)}`
    );

    try {
      const resp = await api.post("/users/login", credentials);
      console.log(`Login response : ${JSON.stringify(resp)}`);

      if (resp.data.statusCode === 200) {
        console.log(
          `login Successfull and status code is : ${resp.data.statusCode}`
        );

        localStorage.setItem("isLogin", true);
      }
      return resp;
    } catch (error) {
      console.error(`Error while loging : ${error.message}`);

      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("isLogin");
    window.location.href = "/";
  },

  isAuthenticte: () => {
    return localStorage.getItem("isLogin") === "true";
  },
};
