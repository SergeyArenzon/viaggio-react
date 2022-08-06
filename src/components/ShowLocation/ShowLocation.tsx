import React, { useEffect, useState, useRef } from "react";
import './ShowLocation.scss'
import StarsRating from "../StarsRating/StarsRating";
import ImageCarousel from "../UI/ImageCarousel/ImageCarousel";
import Map from "../Map/Map";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Locations as locationApi, CommentApi } from "../../services/api/index";
import {ILocation, IComment} from '../../types/types'



const ShowLocation = (): JSX.Element => {
  const [locationData, setLocationData] = useState<ILocation | null>(null);
  const [comments, setComment] = useState([]);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const params = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    const fetchLocation = async () => {
      if(!params.id){
        return;
      }
      const location = await locationApi.getOne(params.id);

      setLocationData(location);
    };

    fetchLocation();

    const fetchComments = async () => {
      if(!params.id){
        return;
      }
      const commentsResponse = await CommentApi.getAll(params.id);
      setComment(commentsResponse);
    };
    fetchComments();
  }, []);

  const onDeleteHandler = async () => {
    if(params.id){
      const response: any = await locationApi.delete(params.id) 
      if(response.status === 200) {
        navigate("/");
      }
    }
    return;
  };

  const onCommentCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    let title: string = "";
    let body: string = "";

    if (
      titleRef.current !== null &&
      titleRef.current !== undefined &&
      bodyRef.current !== null &&
      bodyRef.current !== undefined
    ) {
      title = titleRef.current.value;
      body = bodyRef.current.value;
    }
    const data: { title: string; body: string } = {
      title,
      body,
    };


    if(params.id) {
      const response = await CommentApi.post(params.id, data);
      console.log(response);
      
    }
 
  };

  if (!locationData) {
    return <div>Loading...</div>;
  }

  let commentsForm = null;

  if (comments && comments.length) {
    commentsForm = (
      <ul>
        {comments.map((comment: IComment, index) => (
            <li key={index}>
              {" "}
              Title: {comment.title} Body: {comment.body} Author:{" "}
              {comment.author.firstName + " " + comment.author.lastName}
            </li>
          )
        )}
      </ul>
    );
  }

  
  return (
    <div className="show-location">
      <div className="location-map">
        {locationData.coordinate[0] && locationData.coordinate[1] && (
            <Map
              lat={locationData.coordinate[0]}
              lng={locationData.coordinate[1]}
            />
          )}
        </div>
        <div className="images">
          {locationData.images.length > 0 && (
              <ImageCarousel images={locationData.images} />
            )}
        </div>
        <div className="location-info">
          <StarsRating  currentRating={locationData.avarageRating} />
          <h1 className="text-center text-3xl font-bold">{locationData.name}</h1>
          <div>Location:{locationData.location}</div>
          <div>Price:{locationData.price}$</div>
          <div>Discription:{locationData.description}</div>

          <div>
            <Link to={`/locations/${params.id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={onDeleteHandler}>Delete</button>
          </div>
        </div>

  


        <div className="comments">

          <form onSubmit={onCommentCreate}>
            <input type="text" placeholder="title" ref={titleRef}></input>
            <input type="text" placeholder="body" ref={bodyRef}></input>
            <button>Submit</button>
          </form>
          {/* <div className="mb-5"> */}

          {/* </div> */}
          {commentsForm}
        </div>
    </div>
  );
};

export default ShowLocation;
