import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Locations } from "../../services/api/index";
import axios from 'axios';


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
    <ul>
      {locations &&
        locations.map((location: ILocation, index) => {
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


  // const x = (file: any) => {

  //   const formData = new FormData();
    
  //   formData.append('image', file);
  //   console.log(formData,formData);

  //   axios.post('http://localhost:5000/s3/upload', formData)
  //   // fetch('http://localhost:5000/s3/upload',{
  //   //   method: 'POST',
  //   //   body: formData,
  //   //   headers: { 'Content-Type': 'multipart/form-data'},
  //   // });
  // }

  return (
    <div className="px-20 flex flex-col items-center ">
      <div className="text-center text-green-800 text-5xl mb-10">
        Traveling Locations
      </div>
      {locationsList}
      <Link to="/new-location">Create New Location</Link>
      {/* <input type="file" onChange={(e:any) => {
        if(e.target.files[0]){

          x(e.target.files[0])
        }
      }}></input> */}
    </div>
  );
}
