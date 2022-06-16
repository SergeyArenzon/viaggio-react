import './LocationCard.scss';
import noBackground from "../../assets/images/no-background.jpg"
import {Link} from 'react-router-dom'

export default function LocationCard({ location }: {location: ILocation}) {
  let image = location.images.length > 0 ? `${ process.env.REACT_APP_API_URL}/location/${location.images[0]}/download` : noBackground

  return (
    <div className="location">
           <img className={`location__image ${location.images.length === 0 ? "location__image--empty" : ""}`} src={image} alt="location" />
              <div className="location__info">
                <div className="location__name">
                  {location.name}
                </div>
                <div className="location__location">Where: {location.location}</div>
                <p className="location__description">Description: {location.description}</p>
                <div className="location__price">${location.price} Per night</div>
                <div className="location__show">

                  <Link to={`/locations/${location.id}`}>SHOW</Link>
                </div>
              </div>
    </div>
  )
}
