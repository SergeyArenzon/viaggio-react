import { get, post, put, destroy } from "./config";

const Locations = {
  index: async () => {
    try {
      const response = await get("/location");
      return response.data.locations;
    } catch (error) {
      return { error };
    }
  },
};
export default Locations;