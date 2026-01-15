import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import "../components/utils/fixLeafletIcon";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import { FaStop, FaRecordVinyl, FaExclamationCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import React from "react";

/* ===========================
   ADD CAMERA FORM (OLD STYLE)
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
      _id: Date.now().toString(),
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
      <h3 className="font-semibold mb-3 text-white">Add IP Webcam</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          placeholder="Camera Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white outline-none"
        />
        <input
          placeholder="IP Address"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white outline-none"
        />
        <input
          type="number"
          placeholder="Port"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white outline-none"
        />
        <button className="bg-yellow-500 hover:bg-yellow-600 rounded font-semibold text-black transition">Add Camera</button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

/* ===========================
   INCIDENT MODAL (FIXED SAVE)
=========================== */
const IncidentModal = ({ cam, videoBlob, duration, onClose }) => {
  const [type, setType] = useState("Snatching");
  const [severity, setSeverity] = useState("High");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);

    const performUpload = async (lat, lon) => {
      try {
        const formData = new FormData();
        formData.append("type", type);
        formData.append("severity", severity);
        formData.append("latitude", lat || 24.8607); // Fallback to center if empty
        formData.append("longitude", lon || 67.0011);
        formData.append("cameraId", cam._id);
        formData.append("duration", Math.round(duration));
        formData.append("source", "Manual Capture");
        
        if (videoBlob) {
          formData.append("video", videoBlob, `incident-${Date.now()}.webm`);
        }

        const res = await fetch("http://localhost:5000/api/incidents", {
          method: "POST",
          body: formData
        });

        if (res.ok) {
          toast.error(`🚨 ALERT: ${type} Saved!`, {
            position: "top-center",
            autoClose: 5000,
          });
          onClose();
        } else {
          toast.error("Failed to save to reports");
        }
      } catch (err) {
        toast.error("Backend server connection failed");
      } finally {
        setLoading(false);
      }
    };
    
    // Attempt Geolocation but don't block saving if it fails
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => performUpload(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          console.warn("Location denied, using camera/default GPS");
          performUpload(cam.gps?.[0], cam.gps?.[1]);
        },
        { timeout: 5000 }
      );
    } else {
      performUpload(cam.gps?.[0], cam.gps?.[1]);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-yellow-500 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
           <FaExclamationCircle /> Report Incident
        </h2>
        
        <div className="space-y-4">
          <p className="text-xs text-gray-400">Captured Video: <span className="text-white font-bold">{Math.round(duration)} Seconds</span></p>
          
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">Tag Situation</label>
            <input 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white outline-none focus:border-yellow-500"
              placeholder="e.g. Snatching"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">Severity</label>
            <select 
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white outline-none"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-2 bg-gray-700 text-white rounded font-bold hover:bg-gray-600">Cancel</button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex-1 py-2 bg-yellow-500 text-black rounded font-bold hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Alert"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   CAMERA CARD (OLD STYLE + RECORD)
=========================== */
const CameraCard = ({ cam, onRemove, onUpdateGps }) => {
  const [status, setStatus] = useState("CHECKING");
  const [location, setLocation] = useState(cam.gps);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [capturedBlob, setCapturedBlob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const imgRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(cam.streamUrl, { method: "HEAD" });
        setStatus(res.ok ? "LIVE" : "OFFLINE");
      } catch {
        setStatus("OFFLINE");
      }
    };
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [cam]);

  // Record Logic
  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const stream = canvas.captureStream(12); // Capture canvas at 12fps
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const chunks = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setCapturedBlob(blob);
      setShowModal(true);
      setIsRecording(false);
      setTimer(0);
      clearInterval(timerRef.current);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    setTimer(0);
    timerRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  // Render Loop
  useEffect(() => {
    let anim;
    const ctx = canvasRef.current?.getContext('2d');
    const draw = () => {
      if (ctx && imgRef.current && status === 'LIVE') {
        ctx.drawImage(imgRef.current, 0, 0, 640, 480);
      }
      anim = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(anim);
  }, [status]);

  return (
    <div className="bg-gray-900 p-4 rounded-xl border border-yellow-500 relative min-h-[350px]">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white">{cam.name}</h3>
        <div className="flex gap-2 items-center">
          <span className={`text-[10px] font-bold ${status === "LIVE" ? "text-green-400" : "text-red-400"}`}>
            {status} {isRecording && <span className="text-red-500 animate-pulse ml-1">🔴 {timer}s</span>}
          </span>
          {status === "LIVE" && (
            <button 
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-1.5 rounded-full transition-all ${isRecording ? 'bg-white text-red-600' : 'bg-red-600 text-white hover:bg-red-700'}`}
              title={isRecording ? "Stop Recording" : "Start Recording"}
            >
              {isRecording ? <FaStop size={12} /> : <FaRecordVinyl size={12} />}
            </button>
          )}
          <button onClick={() => onRemove(cam._id)} className="text-gray-500 hover:text-white ml-1">✕</button>
        </div>
      </div>

      <div className="h-[250px] w-full bg-black rounded overflow-hidden">
        {status === "LIVE" ? (
          <>
            <img ref={imgRef} src={cam.streamUrl} crossOrigin="anonymous" className="hidden" alt="raw" />
            <canvas ref={canvasRef} width={640} height={480} className="w-full h-full object-cover" />
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-600 text-xs">OFFLINE</div>
        )}
      </div>

      {location && (
        <div className="text-[10px] text-gray-500 mt-2">
          📍 {location[0].toFixed(5)}, {location[1].toFixed(5)}
        </div>
      )}

      {showModal && <IncidentModal cam={cam} videoBlob={capturedBlob} duration={timer || (capturedBlob ? 14 : 0)} onClose={() => setShowModal(false)} />}
    </div>
  );
};

/* ===========================
   MAP COMPONENT
=========================== */
const FitBounds = ({ locations }) => {
  const map = useMap();
  useEffect(() => {
    if (locations.length > 0) map.fitBounds(locations);
  }, [locations, map]);
  return null;
};

/* ===========================
   DASHBOARD (RE-STYLED TO OLD)
=========================== */
const Dashboard = () => {
  const [cameras, setCameras] = useState(() => {
    const saved = localStorage.getItem("ipwebcams");
    return saved ? JSON.parse(saved) : [];
  });
  const [myLocation, setMyLocation] = useState(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    localStorage.setItem("ipwebcams", JSON.stringify(cameras));
  }, [cameras]);

  const handleTrackMe = () => {
    if (!navigator.geolocation) return;
    setTracking(true);
    navigator.geolocation.watchPosition(
      (pos) => setMyLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  };

  const locationsForMap = [
    ...(myLocation ? [myLocation] : []),
    ...cameras.filter(c => c.gps).map(c => c.gps),
  ];

  return (
    <DashboardLayout>
      <ToastContainer theme="dark" position="top-right" />
      
      {/* Crime Alert Top (Old Style) */}
      <div className="bg-red-900/30 border border-red-500 p-4 rounded-xl mb-6">
        <h2 className="font-semibold text-red-400 flex items-center gap-2">🚨 Live Monitor</h2>
        <p className="text-xs text-gray-300">Observation Mode Active - Recording Ready</p>
      </div>

      {/* Map (Old Style) */}
      <div className="bg-gray-800 p-4 rounded-xl mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-white">Camera & Unit Locations</h3>
          <button
            className={`px-3 py-1 rounded text-xs font-bold ${tracking ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={handleTrackMe}
          >
            {tracking ? "Tracking..." : "Track Me"}
          </button>
        </div>

        <MapContainer
          center={[24.8607, 67.0011]}
          zoom={13}
          style={{ height: "350px", width: "100%", borderRadius: "8px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {myLocation && (
            <>
              <Marker position={myLocation}><Popup>Your Unit</Popup></Marker>
              <Circle center={myLocation} radius={100} pathOptions={{ color: "red", fillOpacity: 0.2 }} />
            </>
          )}
          {cameras.filter(c => c.gps).map(c => (
             <React.Fragment key={c._id}>
                <Marker position={c.gps}><Popup>{c.name}</Popup></Marker>
                <Circle center={c.gps} radius={100} pathOptions={{ color: "yellow", fillOpacity: 0.2 }} />
             </React.Fragment>
          ))}
          <FitBounds locations={locationsForMap} />
        </MapContainer>
      </div>

      <AddCameraForm onCameraAdded={(cam) => setCameras(prev => [cam, ...prev])} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
        {cameras.map(cam => (
          <CameraCard key={cam._id} cam={cam} onRemove={id => setCameras(prev => prev.filter(c => c._id !== id))} onUpdateGps={()=>{}} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
