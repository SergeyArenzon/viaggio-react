import React, { useEffect, useState } from 'react';

export default function Home() {
    const [locations, setLocations] = useState(null);
    // const router = useRouter();
  
    useEffect(() => {

        console.log("zzzzzzzz");
        const getLocations = async() => {

            console.log(`${process.env.REACT_APP_API_URL}/location`);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/location`);
            const updatedLocations = await response.json();
            setLocations(updatedLocations.locations);
        }

        getLocations();
  
    }, []);
  
    const locationsList = (
      <ul>
        {locations && locations.map((location, index) => {
          return (
            <li
              key={location.name + index}
            >
              <div className="text-center text-lg font-bold">{location.name}</div>
              <div>location: {location.location}</div>
              <div>description: {location.description}</div>
              <div>price: {location.price}</div>
              {/* <Link
                type="button"
                href={{
                  pathname: "/location/[id]",
                  query: {
                    id: location.id,
                  },
                }}
              >
                <a className="bg-green-100 p-2 px-8 rounded-md">Info</a>
              </Link> */}
            </li>
          );
        })}
      </ul>
    );
    return (
      <div className="px-20 flex flex-col items-center ">
        <div className="text-center text-green-800 text-5xl mb-10">
          Traveling Locations
        </div>
        {locationsList}
        <button
          className="bg-green-900 px-5 py-5 rounded-xl font-extrabold	text-white cursor-pointer ontent-center"
        //   onClick={() => router.push("/location")}
        >
          Create New Location
        </button>
      </div>
    );
}
