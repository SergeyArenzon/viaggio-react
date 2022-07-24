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
  getOne: async (locationId: string) => {
    try {
      const response = await get(`${process.env.REACT_APP_API_URL}/location/${locationId}`);
      return response.data.location;
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
  },
  edit: async (id: string, body: { 
    name: string,
    location: string,
    price: string,
    description: string,
  }) => {
    try {
      const response = await put(`${process.env.REACT_APP_API_URL}/location/${id}/edit`, body);
      return response;
    } catch (error) {
      console.log(error);
      return(error);
    }
  },
  uploadImage: async (id: string, images: FormData) => {
    try {
      const response = await post(`${process.env.REACT_APP_API_URL}/location/${id}/upload`, images);
      return response;
    } catch (error) {
      console.log(error);
      return(error);
    }
  },
  getImage: async ( image: string) => {
    try {
      const response = await get(`${process.env.REACT_APP_API_URL}/location/${image}/updownload`);
      return response;
    } catch (error) {
      console.log(error);
      return(error);
    }
  },
  
};
export default Locations;