// //////////////////
// Edit view location
// //////////////////

import { AxiosResponse } from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Locations } from '../../services/api/index'

interface Location {
  price: string, 
  coordinate: [number, number],
  description: string,
  location: string,
  name: string,
  images: []
  
}


const EditLocation = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();


  const [locationData, setLocationData] = useState<Location | null>(null);

  useEffect(() => {
    if(!id){
      return;
    }
    const fetchLocation = async () => {
      const location = await Locations.getOne(id);
      setLocationData(location);
    };

    fetchLocation();
  }, []);

  const onSaveHandler = async () => {
    // // Client protection
    // if(locationData.email !== session.user.email){
    //     alert("Wrong user!")
    //     return;
    // }
    if(!id){
      return;
    }

    if(nameRef.current === null || locationRef.current === null || priceRef.current === null || descriptionRef.current === null){
      return;
    }
    const body = {
        name: nameRef.current.value,
        location: locationRef.current.value,
        price: priceRef.current.value,
        description: descriptionRef.current.value,
    };


    const response: any = await Locations.edit(id, body);
    if(response.status === 200){
      navigate(`/locations/${id}`);
    }
  };

  if (!locationData) {
    return <div>loading..</div>;
  }

  return (
    <div>
      <div>
        Name:{" "}
        <input
          type="text"
          defaultValue={locationData.name}
          ref={nameRef}
        ></input>
      </div>
      <div>
        Location:{" "}
        <input
          type="text"
          defaultValue={locationData.location}
          ref={locationRef}
        ></input>
      </div>
      <div>
        Price:{" "}
        <input
          type="number"
          defaultValue={locationData.price}
          ref={priceRef}
        ></input>
      </div>
      <div>
        Description:{" "}
        <textarea
          defaultValue={locationData.description}
          ref={descriptionRef}
        />
      </div>

      <div>
        <button onClick={onSaveHandler}>Save</button>
      </div>
    </div>
  );
}


export default EditLocation;