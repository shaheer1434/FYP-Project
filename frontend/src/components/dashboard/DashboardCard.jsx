const DashboardCard = ({ title, borderColor, children }) => {
  return (
    <div
      className="bg-white/10 backdrop-blur-md border rounded-xl p-4 shadow-lg"
      style={{ borderColor }}
    >
      <h3 className="text-sm font-semibold mb-2 text-gray-200">
        {title}
      </h3>

      <div className="text-sm">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
