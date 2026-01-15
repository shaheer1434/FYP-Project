import React, { useState, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import { 
  FaChartBar, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaFileExport, 
  FaFilter, 
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaVideo,
  FaTrashAlt,
  FaPlayCircle,
  FaFileAlt
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [reportModal, setReportModal] = useState(null);

  const fetchIncidents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/incidents");
      const data = await res.json();
      setIncidents(data);
    } catch (err) {
      toast.error("Failed to fetch exhibition logs");
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("CRITICAL: Reset all exhibition data and recordings? This will clear everything to 0.")) return;
    
    try {
      const res = await fetch("http://localhost:5000/api/incidents", { method: "DELETE" });
      if (res.ok) {
        setIncidents([]);
        toast.info("Exhibition reset successful. All counters at 0.");
      }
    } catch (err) {
      toast.error("Failed to reset exhibition");
    }
  };

  const handleGenerateReport = () => {
    const id = prompt("ENTER INCIDENT ID FOR OFFICIAL REPORT GENERATION:");
    if (!id) return;

    const incident = incidents.find(i => i._id === id);
    if (incident) {
      setReportModal(incident);
      toast.success("Report Generated Successfully");
    } else {
      toast.error("ERROR: Incident ID Not Found in Database");
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (inc._id && inc._id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterSeverity === "All" || inc.severity === filterSeverity;
    return matchesSearch && matchesFilter;
  });

  return (
    <PageLayout>
      <ToastContainer theme="dark" position="top-right" />
      
      {/* Video Overlay Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
           <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition"
              >✕</button>
              <video 
                src={`http://localhost:5000${activeVideo}`} 
                controls 
                autoPlay 
                className="w-full aspect-video"
              />
              <div className="p-4 bg-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                 REPLAYING CAPTURED EVIDENCE CLOUD-NODE-01
              </div>
           </div>
        </div>
      )}

      {/* Official Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 print:bg-white print:p-0">
          <div className="bg-white text-black w-full max-w-2xl p-10 rounded-xl shadow-2xl relative print:w-full print:max-w-none print:shadow-none">
            <button 
              onClick={() => setReportModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black print:hidden"
            >✕</button>

            <div className="border-b-2 border-black pb-6 mb-6 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">Official Incident Report</h1>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">GlobalPath AI Surveillance System</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold">REPORT ID: <span className="font-mono">{reportModal._id.slice(-6).toUpperCase()}</span></p>
                <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-1">Incident Type</p>
                <p className="text-xl font-black">{reportModal.type}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-1">Severity Level</p>
                <p className={`text-xl font-black ${reportModal.severity === 'High' ? 'text-red-600' : 'text-blue-600'}`}>{reportModal.severity}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-1">Detected At</p>
                <p className="font-mono font-bold">{new Date(reportModal.detectedAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-1">Source Camera</p>
                <p className="font-bold">{reportModal.sourceId || "Manual Upload"}</p>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg mb-8 border border-gray-200">
               <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-3">Geolocation Data</p>
               <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-3xl text-red-600" />
                  <div>
                    <p className="text-sm font-bold">LAT: {reportModal.gps?.coordinates[1]}</p>
                    <p className="text-sm font-bold">LNG: {reportModal.gps?.coordinates[0]}</p>
                  </div>
               </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
               <p className="text-[10px] font-bold text-gray-400">AUTHORIZED BY AI SECURITY PROTOCOL</p>
               <button 
                onClick={() => window.print()}
                className="bg-black text-white px-6 py-3 rounded-lg font-bold text-xs uppercase hover:bg-gray-800 transition print:hidden"
               >
                 Print / Save PDF
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-10 pb-20">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div>
            <span className="text-[10px] font-black p-1 px-2 mb-2 inline-block bg-blue-600 text-white rounded-md tracking-tighter uppercase">Exhibition Mode Active</span>
            <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-4">
              <FaChartBar className="text-blue-500" />
              SURVEILLANCE LOGS
            </h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-2">Active unit reporting & evidence cloud</p>
          </div>
          <div className="flex gap-4">
             <button 
                onClick={handleClearAll}
                className="bg-white/5 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white px-6 py-4 rounded-2xl text-xs font-black uppercase transition-all flex items-center gap-2"
             >
                <FaTrashAlt /> RESET EVERYTHING TO 0
             </button>
             <button 
               onClick={handleGenerateReport}
               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase transition-all shadow-xl shadow-blue-600/20"
             >
                Generate Report
             </button>
          </div>
        </div>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 tracking-tighter">
            <StatBox label="TOTAL ALERTS" value={incidents.length} color="text-white" sub="Units Detected" />
            <StatBox label="HIGH SEVERITY" value={incidents.filter(i => i.severity === 'High').length} color="text-red-500" sub="Critical Threat" />
            <StatBox label="EVIDENCE SAVED" value={incidents.filter(i => i.videoUrl).length} color="text-blue-400" sub="Video Clips" />
            <StatBox label="RESOLVED" value={incidents.filter(i => i.status === 'Resolved').length} color="text-green-500" sub="Security Action" />
        </div>

        {/* Data Container */}
        <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-2xl">
           <div className="p-8 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative w-full md:w-96">
                <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white font-bold outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700" 
                  placeholder="Filter exhibition logs..." 
                />
              </div>
              <div className="flex items-center gap-3">
                 <select 
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-black uppercase text-gray-400 outline-none"
                 >
                    <option value="All">All Severity</option>
                    <option value="High">High Only</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                 </select>
              </div>
           </div>

           <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                       <th className="px-8 py-6">Incident Summary</th>
                       <th className="px-8 py-6">Evidence Clip</th>
                       <th className="px-8 py-6">GPS Location</th>
                       <th className="px-8 py-6">Detected At</th>
                       <th className="px-8 py-6">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {filteredIncidents.map(inc => (
                       <tr key={inc._id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-8">
                             <div className="flex items-center gap-5">
                                <span className="hidden group-hover:block absolute left-2 text-[9px] text-gray-500 cursor-pointer" onClick={() => {navigator.clipboard.writeText(inc._id); toast.success("ID Copied");}}>
                                   {inc._id.slice(-6)}...
                                </span>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${inc.severity === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                   <FaExclamationTriangle />
                                </div>
                                <div onClick={() => {navigator.clipboard.writeText(inc._id); toast.success("ID Copied: " + inc._id);}} className="cursor-pointer" title="Click to copy ID">
                                   <p className="text-xl font-black text-white tracking-tighter">{inc.type}</p>
                                   <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mt-1">
                                      ID: {inc._id}
                                   </p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-8">
                             {inc.videoUrl ? (
                                <button 
                                  onClick={() => setActiveVideo(inc.videoUrl)}
                                  className="flex items-center gap-3 bg-red-600/10 text-red-500 border border-red-500/20 px-5 py-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all group/btn"
                                >
                                   <FaPlayCircle size={20} className="group-hover/btn:scale-125 transition-transform" />
                                   <div className="text-left">
                                      <p className="text-[10px] font-black uppercase leading-none">Watch Clip</p>
                                      <p className="text-[9px] font-bold opacity-60 uppercase">{inc.duration} Secs</p>
                                   </div>
                                </button>
                             ) : (
                                <div className="text-[10px] font-black uppercase text-gray-600 bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-fit">
                                   No Video Data
                                </div>
                             )}
                          </td>
                          <td className="px-8 py-8">
                             <div className="flex items-center gap-3 text-gray-300">
                                <FaMapMarkerAlt className="text-red-500" />
                                <div className="font-bold text-[11px] leading-tight">
                                   <p>{inc.gps?.coordinates[1]?.toFixed(5)} N</p>
                                   <p>{inc.gps?.coordinates[0]?.toFixed(5)} E</p>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-8 text-[11px] font-bold text-gray-400">
                             {new Date(inc.detectedAt).toLocaleString()}
                          </td>
                          <td className="px-8 py-8">
                             <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border w-fit font-black text-[9px] uppercase tracking-widest ${inc.status === 'Open' ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-green-500/10 border-green-500/30 text-green-500'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${inc.status === 'Open' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                                {inc.status}
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
              {filteredIncidents.length === 0 && !loading && (
                 <div className="flex flex-col items-center justify-center p-20 grayscale opacity-20">
                    <FaChartBar size={64} className="mb-4" />
                    <p className="text-xl font-black uppercase tracking-tighter">No Exhibition Logs Captured</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </PageLayout>
  );
};

const StatBox = ({ label, value, color, sub }) => (
  <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl relative overflow-hidden group">
     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-all duration-700"></div>
     <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 leading-none">{label}</p>
     <h2 className={`text-5xl font-black ${color} tracking-tighter mb-1`}>{value}</h2>
     <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{sub}</p>
  </div>
);

export default Reports;
