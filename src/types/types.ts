
 export interface ILocation {
    price: string, 
    coordinate: [number, number],
    description: string,
    location: string,
    name: string,
    images: string[],
    id: string,
    avarageRating: number,
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
    firstname: string;
    lastname: string;
  }