
export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface ILocation {
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
  interface IUser {
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    id: string,
    date: string,
  }
  interface IRating {
    rating: number,
    id: string
  }
  
}