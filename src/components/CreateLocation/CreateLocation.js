import React, {useRef, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import ImagesUrlInput from '../ImagesUrlInput/ImagesUrlInput.tsx';

export default function CreateLocation() {

const [imageUrls, setImageUrls] = useState([]);
  const nameRef = useRef();
  const locationRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const latRef = useRef();
  const lngRef = useRef();

  const [session, setSession] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {

  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      location: locationRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      images: imageUrls,
      coordinate: [latRef.current.value, lngRef.current.value],
    };

    // check for input validity
    // const isValid = await locationSchema.isValid(data);
    const isValid = true;

    if (isValid) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/location`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      });
      console.log(await response.json());
      navigate("/");
    }
  };
    return (
        <form onSubmit={submitHandler}>
        <h1>Create New Location</h1>
        <div>Name</div>
        <input type="text" ref={nameRef}></input>
        <div>Location</div>
        <input type="text" ref={locationRef}></input>
        <div>Price</div>
        <input type="number" ref={priceRef}></input>
        <div>Description</div>
        <textarea type="text" ref={descriptionRef}></textarea>
        <ImagesUrlInput imageUrls={imageUrls} setImageUrls={setImageUrls} />
        <input
          type="number"
          step="0.000001"
          ref={latRef}
          placeholder="lat"
        ></input>
        <input
          type="number"
          step="0.000001"
          ref={lngRef}
          placeholder="lng"
        ></input>
        <button>Create</button>
      </form>
    )
}
