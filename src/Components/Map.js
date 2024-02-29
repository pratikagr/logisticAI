import React from "react";
import {
  GoogleMap,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";

const Map = () => {
  const [markers, setMarkers] = React.useState([]);
  const [directions, setDirections] = React.useState(null);
  const [autocomplete, setAutocomplete] = React.useState(null);

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };

  const handleMapClick = (event) => {
    setMarkers([
      ...markers,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ]);
  };

  const handleClearMarkers = () => {
    setMarkers([]);
    setDirections(null);
  };

  const handleCalculateDirections = () => {
    if (markers.length < 2) {
      alert("Please add at least two markers to calculate directions.");
      return;
    }

    const waypoints = markers.slice(1, -1).map((marker) => ({
      location: { lat: marker.lat, lng: marker.lng },
      stopover: true,
    }));

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: markers[0].lat, lng: markers[0].lng },
        destination: {
          lat: markers[markers.length - 1].lat,
          lng: markers[markers.length - 1].lng,
        },
        waypoints: waypoints,
        optimizeWaypoints: true, // Optimize the order of waypoints to minimize the travel distance
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setMarkers([
          ...markers,
          {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        ]);
      }
    }
  };

  return (
    <div>
      {/* <Autocomplete
        onLoad={(auto) => setAutocomplete(auto)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input type="text" placeholder="Search Places..." />
      </Autocomplete> */}
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <button onClick={handleClearMarkers}>Clear Markers</button>
      <button onClick={handleCalculateDirections}>Calculate Directions</button>
    </div>
  );
};

export default Map;
