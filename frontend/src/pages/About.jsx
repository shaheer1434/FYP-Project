import DashboardLayout from "../components/DashboardLayout";

const About = () => {
  return (
    <DashboardLayout>
      <div className="bg-black/60 border border-white/10 rounded-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-500 mb-6">
          About ShieldAI
        </h1>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-6">
          <span className="font-semibold text-white">ShieldAI</span> is an AI-powered
          smart surveillance and safety system designed to enhance public security
          through real-time detection of criminal and emergency incidents.
          The system leverages advanced technologies such as Artificial Intelligence,
          Computer Vision, and Machine Learning to automatically identify
          suspicious activities from CCTV or camera-based video feeds.
        </p>

        <p className="text-gray-300 leading-relaxed mb-6">
          ShieldAI is capable of detecting multiple real-world incidents including
          snatching, harassment, fighting, road accidents, and suspicious objects.
          Upon detection, the system captures a snapshot along with timestamp and
          GPS location and generates an automatic alert that can be sent to
          relevant authorities such as police or emergency services.
        </p>

        <p className="text-gray-300 leading-relaxed mb-6">
          This project is developed as part of a Final Year Design Project (FYP)
          with the goal of reducing dependency on manual monitoring and improving
          response time in high-risk urban areas such as Karachi.
          The system is designed to be scalable, mobile-based, and suitable
          for smart city surveillance environments.
        </p>

        {/* Technology Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Technologies Used
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <li className="bg-gray-900 p-4 rounded-xl border border-gray-700">
              Artificial Intelligence & Machine Learning
            </li>
            <li className="bg-gray-900 p-4 rounded-xl border border-gray-700">
              Computer Vision (YOLOv8 / EfficientDet)
            </li>
            <li className="bg-gray-900 p-4 rounded-xl border border-gray-700">
              Web Application Development
            </li>
            <li className="bg-gray-900 p-4 rounded-xl border border-gray-700">
              GPS & Real-Time Alert Systems
            </li>
          </ul>
        </div>

        {/* Vision Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">
            Vision
          </h2>
          <p className="text-gray-300 leading-relaxed">
            To build an intelligent, reliable, and automated surveillance system
            that contributes to safer cities by enabling faster emergency response
            and smarter crime detection using modern AI technologies.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default About;
