
 export interface ILocation {
    price: string, 
    coordinate: [number, number],
    description: string,
    location: string,
    name: string,
    images: string[],
    id: string,
    rating_count: number,
    rating_sum: number,
    ratings: [IRating]
  }
  export interface IUser {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    id: string,
    date: string,
  }
export interface IRating {
    rating: number,
    id: string
  }
  

  export interface IComment {
    title: string;
    body: string;
    first_name: string;
    last_name: string;
  }