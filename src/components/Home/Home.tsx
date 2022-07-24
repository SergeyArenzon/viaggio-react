import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Locations } from "../../services/api/index";
import './Home.scss';
import BorderedButtom from './../UI/BorderedButton/BorderedButton';
import LocationCard from '../LocationCard/LocationCard';
import {ILocation, IUser} from '../../types/types';


export default function Home() {
  const [locations, setLocations] = useState<null | ILocation[]>(null);
  // const user = useSelector((state: IUser) => state.user.info);
  const user = useSelector((state: IUser) => state);

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


            <li key={location.name + index}>
              <LocationCard location={location}/>
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
        {/* <img src={travelingImg}/> */}
      </div>
      <div className="locations-container">

        {locationsList}
      </div>
    </div>
  );
}
