import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";



function Map(props) {

  const markers = [
    {
      id: 1,
      name: props.doctorSettings.name,
      position: { lat: props.doctorSettings.location.lat, lng: props.doctorSettings.location.lng }
    },
  ];

  const [activeMarker, setActiveMarker] = useState(null);

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
      mapContainerStyle={{ width: "100%", height: "400px" }}
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
              <div className="dark:text-moroi-dark">{name}</div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>
  );
}

export default Map;
