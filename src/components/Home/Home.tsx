import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Locations } from "../../services/api/index";
import noBackground from "../../assets/images/no-background.jpg"
import './Home.scss';
import travelingImg from '../../assets/images/traveling.svg';
import BorderedButtom from './../UI/BorderedButton/BorderedButton';
import LocationCard from '../LocationCard/LocationCard';


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
// interface ILocation {
//   price: string, 
//   coordinate: [number, number],
//   description: string,
//   location: string,
//   name: string,
//   images: string[],
//   id: string
  
// }

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

  // console.log(locations);
  

  const locationsList = (
    <ul className="locations-container">
      {locations &&
        locations.map((location: ILocation, index) => {
          let image = location.images.length > 0 ? `${ process.env.REACT_APP_API_URL}/location/${location.images[0]}/download` : noBackground
          return (


            <li key={location.name + index}>
              <LocationCard/>
            </li>


          );
        })}
    </ul>
  );

  

  return (
    <div className="home">
      <div className="intro">
        <p>
          <strong>Share</strong> Your<br/> <strong>Traveling</strong><br/> Locations<strong>.</strong>
          <div className="intro__share">
            <Link to="/new-location">
                  <BorderedButtom>Share Location</BorderedButtom>
            </Link>
          </div>
        </p>
        <img src={travelingImg}/>
      </div>
      <div className="locations-container">

        {locationsList}
      </div>
    </div>
  );
}
