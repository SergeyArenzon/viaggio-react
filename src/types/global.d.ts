
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
    avarageRating: number
  }
  interface IUser {
    user: {
      info: {
        firstName: string,
        lastName: string,
        email: string,
        _id: string,
        date: string,
      }
    }
  }
  
}