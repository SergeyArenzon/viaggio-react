
import { GoogleMap, useJsApiLoader, Marker, StreetViewService } from '@react-google-maps/api';
import React from 'react'

const { REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY } = process.env;

type MapProprs = {
  lat: number,
  lng: number

}

const Map = ({ lat, lng}: MapProprs)=> {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_PUBLIC_GOOGLE_MAPS_API_KEY!
  })

  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat,
    lng
  };
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])


  

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      <Marker position={center}/>
      </GoogleMap>
  ) : <></>

}

export default React.memo(Map);