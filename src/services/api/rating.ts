import { get, post, put, destroy } from "./config";

const Rating = {
    update: async (locationId: string, data: {rating: number}) => {
        try {
          const response = await put(`${process.env.REACT_APP_API_URL}/location/${locationId}/rating`, data);
          return response
        } catch (error) {
          return  error ;
        }
      },
}

export default Rating;
