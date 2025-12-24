import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-xl text-center animate-fadeIn">

        <h1 className="text-5xl font-bold text-indigo-700 mb-4 drop-shadow">
          Service Desk
        </h1>

        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
          A modern ticketing system where users can submit issues and admins 
          can efficiently manage and resolve support requests.
        </p>

        <div className="flex justify-center space-x-6">

          <Link
            to="/register"
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl 
            transition duration-300 transform hover:-translate-y-1"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl 
            transition duration-300 transform hover:-translate-y-1"
          >
            Login
          </Link>

        </div>

      </div>
    </div>
  );
}

