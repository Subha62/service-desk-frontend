import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({});

  const token = localStorage.getItem("token");

  // ✅ Added reusable fetch function
  const fetchData = async () => {
    try {
      const t = await api.get("/admin/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const s = await api.get("/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTickets(t.data);
      setStats(s.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "open":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "in progress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "resolved":
      case "closed":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold mb-6 text-slate-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3>Total Tickets</h3>
          <p className="text-3xl text-blue-600">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3>Pending</h3>
          <p className="text-3xl text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3>Resolved</h3>
          <p className="text-3xl text-green-600">{stats.resolved}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Created By</th>
              <th className="px-6 py-3">Assigned To</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t._id} className="border-b hover:bg-gray-50">

                <td className="px-6 py-4 text-blue-600 font-semibold">{t.title}</td>
                <td className="px-6 py-4">{t.createdBy?.name || "Unknown"}</td>

                <td className="px-6 py-4">
                  {t.assignedTo?.name || (
                    <span className="text-gray-500">Not Assigned</span>
                  )}
                </td>

                <td className={`px-6 py-4 ${getPriorityColor(t.priority)}`}>
                  {t.priority}
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full border ${getStatusClass(t.status)}`}>
                    {t.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-3">

                  {/* ✅ Assign */}
                  <button
                    onClick={async () => {
                      const userId = prompt("Enter user ID to assign ticket:");

                      if (userId) {
                        try {
                          await api.post(
                            "/admin/assign",
                            { ticketId: t._id, userId },
                            { headers: { Authorization: `Bearer ${token}` } }
                          );

                          alert("Ticket assigned successfully!");

                          await fetchData(); // ✅ FIX (no reload)

                        } catch (err) {
                          console.error(err);
                          alert("Failed to assign ticket.");
                        }
                      }
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Assign
                  </button>

                  {/* ✅ Status */}
                  <button
                    onClick={async () => {
                      const status = prompt(
                        "Enter new status (Pending, In Progress, Resolved):",
                        t.status
                      );

                      if (!status) return;

                      try {
                        await api.put(
                          `/admin/tickets/${t._id}/status`,
                          { status },
                          { headers: { Authorization: `Bearer ${token}` } }
                        );

                        alert("Status updated!");

                        await fetchData(); // ✅ FIX

                      } catch (err) {
                        console.error(err);
                        alert("Failed to update status.");
                      }
                    }}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Status
                  </button>

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}




