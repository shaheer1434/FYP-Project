import DashboardLayout from "../components/DashboardLayout";

const Contact = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold text-blue-500 mb-4">
        Contact Us
      </h1>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-xl">
        <p className="text-gray-300 mb-2">📧 Email: ahmed.g24947@iqra.edu.pk</p>
        <p className="text-gray-300 mb-2">📞 Phone: +92 318 3200596</p>
        <p className="text-gray-300">📍 Location: Karachi, Pakistan</p>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
