import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImagesUrlInput from "../ImagesUrlInput/ImagesUrlInput";
import { Locations } from "../../services/api/index";


const CreateLocation = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (
      nameRef.current === null ||
      locationRef.current === null ||
      priceRef.current === null ||
      descriptionRef.current === null ||
      latRef.current === null ||
      lngRef.current === null
    ) {
      return;
    }

    const data = {
      name: nameRef.current.value,
      location: locationRef.current.value,
      price: Number(priceRef.current.value),
      description: descriptionRef.current.value,
      images: imageUrls,
      coordinate: [Number(latRef.current.value), Number(lngRef.current.value)],
    };

    // check for input validity
    // const isValid = await locationSchema.isValid(data);
    const isValid: boolean = true;

    if (isValid) {
      try{
        await Locations.create(data);
        navigate("/");
      } catch(error) {
        console.log(error);
      }
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
      <textarea ref={descriptionRef}></textarea>
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
  );
};

export default CreateLocation;
