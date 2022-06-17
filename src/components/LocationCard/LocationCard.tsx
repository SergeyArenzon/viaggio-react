import './LocationCard.scss';
import noBackground from "../../assets/images/no-background.jpg";
import {Link} from 'react-router-dom';
import Rating from "@material-ui/lab/Rating";


export default function LocationCard({ location }: {location: ILocation}) {
  let image = location.images.length > 0 ? `${ process.env.REACT_APP_API_URL}/location/${location.images[0]}/download` : noBackground


  return (
    <div className="location">
        <img className={`location__image ${location.images.length === 0 ? "location__image--empty" : ""}`} src={image} alt="location" />
        {location?.ratings.length > 0 && <div className='location__rating'>
          <Rating name="read only" value={location?.avarageRating} readOnly/>
          <span>({location.ratings.length})</span>
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
