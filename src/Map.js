import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import scriptLoader from 'react-async-script-loader';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 20.5937,
  lng: 78.9629,
};

const Map = ({ isScriptLoaded, isScriptLoadSucceed, isActive }) => {
  const [map, setMap] = useState(null);
  const [coordinatePoints, setCoordinatePoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    if (isScriptLoaded && isScriptLoadSucceed && isActive) {
      const fetchCoordinatePoints = async () => {
        try {
          const points = [];
          const response = await axios.get(`${process.env.REACT_APP_HOST_BACKEND}/fetchCoordinates?category=${"IITs"}`);
          points.push(...response.data);
          setCoordinatePoints(points);
        } catch (error) {
          console.error('Error fetching coordinate points:', error);
        }
      };
      fetchCoordinatePoints();
    }
  }, [isScriptLoaded, isScriptLoadSucceed, isActive]);


  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = (point) => {
    setSelectedPoint(point);
  };

  const handleInfoWindowClose = () => {
    setSelectedPoint(null);
  };

  return (
    <div className={`map-container ${isActive ? 'active' : ''}`} style={{ height: '100vh' }}>
      <header className="map-header" style={{ fontSize: '20px', padding: '10px' }}>
        Map
      </header>
      <div className="map-content" style={{ display: 'flex' }}>
        <div className="map-sidebar" style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
          <h2>Coordinates</h2>
        </div>
        {isActive && isScriptLoaded && isScriptLoadSucceed && (
          <div className="map" style={{ height: '100%', width: '100%', position: 'relative' }}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={5}
              onLoad={handleMapLoad}
            >
              {coordinatePoints.map((point) => (
                <div key={point.id}>
                <h2>{point.name}</h2>
                <Marker
                  key={point.id}
                  position={{ lat: point.latitude, lng: point.longitude }}
                  icon={{
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 6,
                    fillColor: 'red',
                    fillOpacity: 1,
                    strokeWeight: 1,
                  }}
                  onClick={() => handleMarkerClick(point)}
                />
                </div>
              ))}

              {selectedPoint && (
                <InfoWindow
                  position={{ lat: selectedPoint.latitude, lng: selectedPoint.longitude }}
                  onCloseClick={handleInfoWindowClose}
                >
                  <div className="info-window">
                    <h3>{selectedPoint.name}</h3>
                    <p>{selectedPoint.description}</p>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
        )}
      </div>
    </div>
  );
};

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&libraries=places`,
])(Map);