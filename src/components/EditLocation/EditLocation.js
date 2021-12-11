// //////////////////
// Edit view location
// //////////////////

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

export default function EditLocation() {
  const nameRef = useRef();
  const locationRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const { id } = useParams();


  const [locationData, setLocationData] = useState(null);

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

    const body = JSON.stringify({
        name: nameRef.current.value,
        location: locationRef.current.value,
        price: priceRef.current.value,
        description: descriptionRef.current.value,
    })
    console.log(body);


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
          type="text"
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
