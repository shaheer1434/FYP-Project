import Sidebar from "./Sidebar";

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#131B42] to-[#0C112D] text-white">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
