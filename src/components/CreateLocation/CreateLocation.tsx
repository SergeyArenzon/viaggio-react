import React, { useEffect, useState } from "react";
import "./CreateLocation.scss";
import { useNavigate } from "react-router-dom";
import { Locations } from "../../services/api/index";
import createLocationImage from "../../assets/images/create-location-image.jpg";
import Input from "../UI/Input/Input";
import BorderedButton from "../UI/BorderedButton/BorderedButton";
import addImageIcon from '../../assets/images/add-image.png';

const CreateLocation = () => {
  const [images, setImages] = useState<File[]>([]);
  const [slidePage, setSlidePage] = useState(false);
  
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [loading, ] = useState<Boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSlidePage(true);
  }, []);

  const submitHandler = async (): Promise<void> => {
    if (
      name === "" ||
      location === "" ||
      price === "" ||
      description === "" ||
      lat === "" ||
      lng === ""
    ) {
      return;
    }

    const data = {
      name,
      location,
      price: Number(price),
      description,
      coordinate: [Number(lat), Number(lng)],
    };

    // check for input validity
    // const isValid = await locationSchema.isValid(data);
    const isValid: boolean = true;

    if (isValid) {
      try {
        const location = await Locations.create(data);
        if (images.length > 0) {
          const formData = new FormData();
          [...images].forEach((image) => {
            formData.append("image", image);
          });

          Locations.uploadImage(location.data.response._id, formData);
        }
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const imagesInputHandler = (e: any) => {
    const imagesList = e.target.files;
    setImages(imagesList);
  };

  return (
    <div
      className={`create-location ${
        slidePage ? "create-location--slide-in" : ""
      }`}
    >
      <img src={createLocationImage} className={`create-location__image`} alt="add-location"/>
      <div className="create-location__form">
        <div className="create-location__content">
          <h1 className="create-location__title">Create New Location</h1>
          <div className="create-location__label">Name</div>
          <Input type="text" setState={setName}/>
          {/* <input type="text" ref={nameRef}></input> */}
          <div className="create-location__label">Location</div>
          <Input type="text" setState={setLocation}/>
          <div className="create-location__label">Price</div>
          <Input type="number" setState={setPrice}/>
          <div className="create-location__label">Description</div>
          {/* <Input type="textarea" inputRef={descriptionRef}/> */}
          <Input type="textarea" setState={setDescription}/>
          <div className="create-location__label">Latitude</div>
          <Input type="number" placeholder="lat" step="0.000001" setState={setLat}/>
          <div className="create-location__label">Longitude </div>
          <Input type="number" placeholder="lng" step="0.000001" setState={setLng}/>
          <div className="create-location__add-image">
          <label htmlFor="add-image" className="add-image-label"><img src={addImageIcon} alt="add-img"/></label>
            <input type="file" id="add-image"  onChange={imagesInputHandler} multiple></input>

              
          </div>
          <div style={{height:"40px", width: "100%",marginTop:"20px"}}>
              <BorderedButton buttonStyle={`${!loading ? "bordered-button--colored-bg" : "bordered-button--no-hover"} bordered-button--rounded-radius`} clickHandler={submitHandler}>
                  Create
              </BorderedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLocation;
