import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

const IncidentMap = ({ incidents, center, radius }) => {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {radius && (
        <Circle center={center} radius={radius} pathOptions={{ color: "red" }} />
      )}

      {incidents.map((incident) => (
        <Marker
          key={incident._id}
          position={[
            incident.gps.coordinates[1], // latitude
            incident.gps.coordinates[0]  // longitude
          ]}
        >
          <Popup>
            <strong>{incident.type}</strong><br />
            Severity: {incident.severity}<br />
            Status: {incident.status}<br />
            Time: {new Date(incident.detectedAt).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default IncidentMap;
