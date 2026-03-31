import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Click handler
const ClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapView = ({ lat, lon, city, onMapClick }) => {
  if (!lat || !lon) {
    return <div className="text-gray-500">Loading map...</div>;
  }

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={8}
      className="w-full h-full rounded-xl"
    >
      {/* Base Map */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Weather Layer */}
      <TileLayer
        url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=2541a9ad17f8f3f868957df6cc309d8c`}
        opacity={0.5}
      />

      <ClickHandler onMapClick={onMapClick} />

      <Marker position={[lat, lon]}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;