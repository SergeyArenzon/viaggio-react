import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Locations } from "../../services/api/index";
import './Home.scss';


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
interface ILocation {
  price: string, 
  coordinate: [number, number],
  description: string,
  location: string,
  name: string,
  images: [],
  id: string
  
}

export default function Home() {
  const [locations, setLocations] = useState<null | ILocation[]>(null);
  const user = useSelector((state: IUser) => state.user.info);

  useEffect(() => {
    const getLocations = async () => {
      const locations = await Locations.index();
      setLocations(locations);
    };
    getLocations();
  }, []);

  const locationsList = (
    <ul className="locations-container">
      {locations &&
        locations.map((location: ILocation, index) => {
          return (
            <li className="location" key={location.name + index}>

              <img className="location__image"/>
              <div className="location__info">
                <div className="location__name">
                  {location.name}
                </div>
                <div className="location__location">location: {location.location}</div>
                <p className="location__description">{location.description}</p>
                <div className="location__price">${location.price}</div>
                <div className="location__show">

                  <Link to={`/locations/${location.id}`}>SHOW</Link>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );


  return (
    <div className="home">
      <div className="">Traveling Locations</div>
      {locationsList}
      <Link to="/new-location">Create New Location</Link>
    </div>
  );
}
