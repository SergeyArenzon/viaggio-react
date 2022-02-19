import { get, post, put, destroy } from "./config";

const Comment = {
    post: async (locationId: string, comment: any) => {
        try {
            const response = await post(`${process.env.REACT_APP_API_URL}/location/${locationId}/comment`, comment);
          return response
        } catch (error) {
          return  error ;
        }
      },
}

export default Comment;
