import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";



function Map(props) {

  const [activeMarker, setActiveMarker] = useState(null);


  if (!props.docData.location) {
    return null;
  }

  const markers = [
    {
      id: 1,
      name: props.docData.name,
      position: {
        lat: props.docData.location.lat !== null ? props.docData.location.lat : 40.2252558,
        lng: props.docData.location.lng !== null ? props.docData.location.lng : -74.716095
      },
    },
  ];

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "100%", height: "400px", borderRadius: "5px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
      zoom={17}
    >
      {markers.map(({ id, name, position }) => (
        <Marker
          key={id}
          position={position}
          onLoad={() => handleActiveMarker(id)}
          zoom={17}
        >
          {activeMarker === id ? (
            <InfoWindow>
              <div className="text-moroi-dark">{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
