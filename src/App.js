import { useState } from "react";
// import { TrafficLayer } from "./components/Traffic"
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  TrafficLayer,
  InfoWindow,
} from "@react-google-maps/api";

const center = {
  lat: 20.2960,
  lng: 85.8245,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCER5etJ6Db1GCbArkle4Bect8oANQIuo8",
  });
  const [markerPosition, setMarkerPosition] = useState(center);

  return isLoaded ? (
    <>
      <GoogleMap
        center={center}
        zoom={8}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <TrafficLayer autoUpdate />
        <Marker position={markerPosition} />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}
export default App;
