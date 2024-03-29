import './LocationCard.scss';
import noBackground from "../../assets/images/no-background.jpg";
import {Link} from 'react-router-dom';
import {Rating} from "@mui/material";
import { ILocation } from '../../types/types';


export default function LocationCard({ location }: {location: ILocation}) {
  // aws images 
  // const previewImage = `${ process.env.REACT_APP_API_URL}/location/${location.images[0]}/download`
  // aws images 
  const previewImage = location.images ? location.images[0] : null

  let image = location.images?.length > 0 ? `${previewImage}` : noBackground


  return (
    <div className="location">
        <img className={`location__image ${!location.images ? "location__image--empty" : ""}`} src={image} alt="location" />
        {location?.rating_count > 0 && <div className='location__rating'>
          <Rating name="read only" value={+(Math.round(location.rating_sum / location.rating_count * 2) / 2).toFixed(1)} readOnly/>
          <span>({location.rating_count})</span>
        </div>}
        <div className="location__info">
        <div className="location__name location__title">{location.name}</div>
        <div className="location__location"><span className="location__title">Where:</span> {location.location}</div>
        <p className="location__description"><span className="location__title">Description:</span> {location.description}</p>
        <div className="location__price"><span className="location__title">Price: </span>${location.price} <span className="location__price-per-night">per night</span></div>
        <div className="location__show">

            <Link to={`/locations/${location.id}`}>SHOW</Link>
        </div>
        </div>
    </div>
  )
}
