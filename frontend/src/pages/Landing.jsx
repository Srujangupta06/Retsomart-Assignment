import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-2xl md:text-4xl font-bold text-blue-500 mb-6">
        Welcome to Task Management
      </h1>
      <p className="text-md md:text-lg text-gray-700 mb-8">
        Where you can manage your tasks easily and boost your productivity!
      </p>

      <button
        className="cursor-pointer px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => navigate("/home")}
      >
        Get Started
      </button>
    </div>
  );
};

export default Landing;
