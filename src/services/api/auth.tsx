import { get, post, put, destroy } from "./config";


interface IUserData {
  
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  
}


const Auth = {
  user: async () => {
    try {
      const response = await get("/user");
      // console.log(response);
      response.data.id = response.data._id;
      return response.data;
    } catch (error) {
      return error ;
    }
  },
  register: async (userData: IUserData) => {
    try {
      const response = await post(`${process.env.REACT_APP_API_URL}/register`, userData);
      return response;
    } catch (error) {
      return error ;
    }
  },
  login: async (userData: {email: string, password: string}) => {
    try {
      const response = await post(`${process.env.REACT_APP_API_URL}/login`, userData);
      return response;
    } catch (error) {
      return error ;
    }
  },
  logout: async () => {
    try {
      const response = await get(`${process.env.REACT_APP_API_URL}/logout`);
      return response;
    } catch (error) {
      return error ;
    }
  },
};
export default Auth;