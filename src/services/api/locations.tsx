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
  create: async (
    data: { 
      name: string,
      location: string,
      price: number,
      description: string,
      images: string[],
      coordinate: number[]
  }) => {
    try{
      const response = await post(`${process.env.REACT_APP_API_URL}/location`, data);
      return response
    } catch(error) {
      throw error;
    }

  },

  delete: async (id: string) => {
    try {
      const response = await destroy(`${process.env.REACT_APP_API_URL}/location/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      return(error);
    }
  }
};
export default Locations;