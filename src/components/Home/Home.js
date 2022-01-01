import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Locations } from "../../services/api/index.js";

export default function Home() {
  const [locations, setLocations] = useState(null);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const getLocations = async () => {
      const locations = await Locations.index();
      setLocations(locations);
    };
    getLocations();
  }, []);

  const locationsList = (
    <ul>
      {locations &&
        locations.map((location, index) => {
          return (
            <li key={location.name + index}>
              <div className="text-center text-lg font-bold">
                {location.name}
              </div>
              <div>location: {location.location}</div>
              <div>description: {location.description}</div>
              <div>price: {location.price}</div>
              <Link to={`/locations/${location.id}`}>Info</Link>
            </li>
          );
        })}
    </ul>
  );

  return (
    <div className="px-20 flex flex-col items-center ">
      <div className="text-center text-green-800 text-5xl mb-10">
        Traveling Locations
      </div>
      {locationsList}
      <Link to="/new-location">Create New Location</Link>
    </div>
  );
}
