import React from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiPlusCircle, FiShield } from "react-icons/fi";

export default function Dashboard() {
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-800 drop-shadow-sm">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="mt-2 text-gray-700 text-lg">
          Manage your support tickets and track updates easily.
        </p>
      </div>

      {/* Centered Card Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">

          {/* USER OPTIONS */}
          {!user?.isAdmin && (
            <>
              {/* My Tickets */}
              <Link
                to="/tickets"
                className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl 
                           transform hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-100 text-indigo-700 p-4 rounded-xl 
                                  group-hover:bg-indigo-600 group-hover:text-white transition">
                    <FiFileText size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">
                      My Tickets
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      View and track all your submitted issues.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Create Ticket */}
              <Link
                to="/tickets/new"
                className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl 
                           transform hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 text-green-700 p-4 rounded-xl 
                                  group-hover:bg-green-600 group-hover:text-white transition">
                    <FiPlusCircle size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-800">
                      Create Ticket
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Submit a new request or report an issue.
                    </p>
                  </div>
                </div>
              </Link>
            </>
          )}

          {/* ADMIN OPTION */}
          {user?.isAdmin && (
            <Link
              to="/admin"
              className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl 
                         transform hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-100 text-red-700 p-4 rounded-xl 
                                group-hover:bg-red-600 group-hover:text-white transition">
                  <FiShield size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800">
                    Admin Dashboard
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage all tickets and users in the system.
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}




