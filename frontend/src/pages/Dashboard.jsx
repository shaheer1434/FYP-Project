import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "../components/utils/fixLeafletIcon";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";

/* ===========================
   ADD CAMERA FORM
=========================== */
const AddCameraForm = ({ onCameraAdded }) => {
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState(8080);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !ip || !port) {
      setError("All fields required");
      return;
    }

    const streamUrl = `http://${ip}:${port}/video`;
    const statusUrl = `http://${ip}:${port}/status.json`;

    onCameraAdded({
      _id: Date.now(),
      name,
      ip,
      port,
      streamUrl,
      statusUrl,
      status: "CHECKING",
      gps: null,
      radius: 100,
    });

    setName("");
    setIp("");
    setPort(8080);
    setError("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl mb-6">
      <h3 className="font-semibold mb-3">Add IP Webcam</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          placeholder="Camera Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-700"
        />
        <input
          placeholder="IP Address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="p-2 rounded bg-gray-700"
        />
        <input
          type="number"
          placeholder="Port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          className="p-2 rounded bg-gray-700"
        />
        <button className="bg-yellow-500 rounded font-semibold">Add Camera</button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

/* ===========================
   CAMERA CARD
=========================== */
const CameraCard = ({ cam, onRemove, onUpdateGps }) => {
  const [status, setStatus] = useState("CHECKING");
  const [location, setLocation] = useState(cam.gps);
  const cardRef = useRef(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(cam.streamUrl, { method: "HEAD" });
        setStatus(res.ok ? "LIVE" : "OFFLINE");
      } catch {
        setStatus("OFFLINE");
      }
    };

    const fetchLocation = async () => {
      try {
        const res = await fetch(cam.statusUrl);
        const data = await res.json();
        if (data?.gps?.latitude && data?.gps?.longitude) {
          const gps = [data.gps.latitude, data.gps.longitude];
          setLocation(gps);
          onUpdateGps(cam._id, gps, data?.radius || 100);
        } else {
          const geoRes = await fetch(`https://ipapi.co/${cam.ip}/json/`);
          const geoData = await geoRes.json();
          if (geoData.latitude && geoData.longitude) {
            const gps = [geoData.latitude, geoData.longitude];
            setLocation(gps);
            onUpdateGps(cam._id, gps, 100);
          }
        }
      } catch {}
    };

    checkStatus();
    fetchLocation();

    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [cam, onUpdateGps]);

  return (
    <div
      ref={cardRef}
      className="bg-gray-900 p-4 rounded-xl border border-yellow-500 relative resize overflow-auto"
      style={{ minHeight: "280px", maxHeight: "600px" }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{cam.name}</h3>
        <div className="flex gap-2 items-center">
          <span
            className={`text-sm font-bold ${
              status === "LIVE" ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </span>
          <button
            onClick={() => onRemove(cam._id)}
            className="text-red-400 font-bold ml-2"
            title="Remove Camera"
          >
            ✕
          </button>
        </div>
      </div>

      {status === "LIVE" ? (
        <iframe
          src={cam.streamUrl}
          title={cam.name}
          style={{ width: "100%", height: "calc(100% - 40px)", border: "none" }}
        />
      ) : (
        <div className="h-[200px] flex items-center justify-center text-gray-400">
          Camera Offline
        </div>
      )}

      {location && (
        <div className="text-xs text-gray-400 mt-2">
          📍 {location[0].toFixed(5)}, {location[1].toFixed(5)}
        </div>
      )}
    </div>
  );
};

/* ===========================
   MAP FIT BOUNDS
=========================== */
const FitBounds = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    if (locations.length > 0) map.fitBounds(locations);
  }, [locations, map]);
  return null;
};

/* ===========================
   DASHBOARD
=========================== */
const Dashboard = () => {
  const [cameras, setCameras] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ipwebcams");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [myLocation, setMyLocation] = useState(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ipwebcams", JSON.stringify(cameras));
    }
  }, [cameras]);

  const handleUpdateGps = (id, gps, radius) => {
    setCameras((prev) =>
      prev.map((c) => (c._id === id ? { ...c, gps, radius } : c))
    );
  };

  // Track Me
  const handleTrackMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    setTracking(true);
    navigator.geolocation.watchPosition(
      (pos) => setMyLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 0 }
    );
  };

  const locationsForMap = [
    ...(myLocation ? [myLocation] : []),
    ...cameras.filter(c => c.gps).map(c => c.gps),
  ];

  const incident = { type: "Suspicious Activity" };

  return (
    <DashboardLayout>
      {/* Crime Alert */}
      <div className="bg-red-900/30 border border-red-500 p-4 rounded-xl mb-6">
        <h2 className="font-semibold text-red-400">🚨 Crime Alert</h2>
        <p className="text-sm text-gray-300">{incident.type} detected</p>
      </div>

      {/* Map */}
      <div className="bg-gray-800 p-4 rounded-xl mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Incident & Camera Locations</h3>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={handleTrackMe}
          >
            {tracking ? "Tracking..." : "Track Me"}
          </button>
        </div>

        <MapContainer
          center={[24.8607, 67.0011]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Laptop / user marker */}
          {myLocation && (
            <>
              <Marker position={myLocation}>
                <Popup>Your Device</Popup>
              </Marker>
              <Circle
                center={myLocation}
                radius={100}
                pathOptions={{ color: "red", fillOpacity: 0.2 }}
              />
            </>
          )}

          {/* Cameras */}
          {cameras.filter(c => c.gps).map(c => (
            <React.Fragment key={c._id}>
              <Marker position={c.gps}>
                <Popup>{c.name}</Popup>
              </Marker>
              <Circle
                center={c.gps}
                radius={c.radius || 100}
                pathOptions={{ color: "yellow", fillOpacity: 0.2 }}
              />
            </React.Fragment>
          ))}

          <FitBounds locations={locationsForMap} />
        </MapContainer>
      </div>

      {/* Cameras */}
      <AddCameraForm onCameraAdded={(cam) => setCameras(prev => [cam, ...prev])} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cameras.map(cam => (
          <CameraCard
            key={cam._id}
            cam={cam}
            onRemove={id => setCameras(prev => prev.filter(c => c._id !== id))}
            onUpdateGps={handleUpdateGps}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
