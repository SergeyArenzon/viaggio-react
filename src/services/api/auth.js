import { get, post, put, destroy } from "./config";

const Auth = {
  user: async () => {
    try {
      const response = await get("/user");
      return response.data.user;
    } catch (error) {
      return { error: error.message };
    }
  },
};
export default Auth;