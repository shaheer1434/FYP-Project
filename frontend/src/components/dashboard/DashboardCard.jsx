const DashboardCard = ({ title, borderColor, children }) => {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md border rounded-2xl p-5 shadow-xl`}
      style={{ borderColor }}
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default DashboardCard;
