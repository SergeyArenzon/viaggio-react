// //////////////////
// Edit view location
// //////////////////

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

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


  const [locationData, setLocationData] = useState<Location | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/location/${id}`
      );
      const data = await response.json();
      setLocationData(data.location);
    };

    fetchLocation();
  }, []);

  const onSaveHandler = async () => {
    // // Client protection
    // if(locationData.email !== session.user.email){
    //     alert("Wrong user!")
    //     return;
    // }

    if(nameRef.current === null || locationRef.current === null || priceRef.current === null || descriptionRef.current === null){
      return;
    }
    const body = JSON.stringify({
        name: nameRef.current.value,
        location: locationRef.current.value,
        price: priceRef.current.value,
        description: descriptionRef.current.value,
    })

    fetch(`${process.env.REACT_APP_API_URL}/location/${id}/edit`, 
    {
        headers: {

            'Accept': 'application/json',
            'Content-type': 'application/json',
        
          }, 
        method: "PUT",  
        body: body
    }
        );
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