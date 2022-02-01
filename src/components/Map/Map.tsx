import GoogleMapReact from "google-map-react";
import markerSvg from "../../assets/images/google_maps_mark.svg";

const { REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY } = process.env;

const Map = ({ lat, lng }: {
  lat: number, 
  lng: number
}
)=> {

  return (
    <div style={{ height: "400px", width: "400px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY!}}
        defaultCenter={{ lat, lng }}
        defaultZoom={11}
      >
        <img
          src={markerSvg}
          lat={lat}
          lng={lng}
          text="My Marker"
          alt="marker"
          
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map;