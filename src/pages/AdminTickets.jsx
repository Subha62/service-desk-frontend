import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function AdminTickets() {
  const [tickets, setTickets] = useState([]);

  // Fetch all tickets for admin
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await api.get("/admin/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTickets(data);
      } catch (err) {
        console.error("Error loading admin tickets:", err);
      }
    })();
  }, []);

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-700 border border-green-300";
      case "in progress":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "closed":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  // Priority colors
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-700";
    }
  };

  // Update ticket status
  const updateStatus = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/admin/tickets/${ticketId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh table after update
      setTickets((prev) =>
        prev.map((t) =>
          t._id === ticketId ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // Assign ticket (Admin self-assign or assign to another user)
  const assignTicket = async (ticketId) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/admin/assign",
        { ticketId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Ticket assigned successfully!");
    } catch (err) {
      console.error("Assign failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Admin Ticket Management</h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3">Ticket ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((t) => (
              <tr key={t._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm">{t._id}</td>

                <td className="px-6 py-4 font-semibold text-blue-600">
                  <Link to={`/tickets/${t._id}`}>{t.title}</Link>
                </td>

                <td className={`px-6 py-4 capitalize font-medium ${getPriorityColor(t.priority)}`}>
                  {t.priority}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={t.status}
                    onChange={(e) => updateStatus(t._id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      t.status
                    )} cursor-pointer`}
                  >
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>

                <td className="px-6 py-4">{t.user?.name || "Unknown"}</td>

                <td className="px-6 py-4 flex items-center gap-3">

                  <button
                    onClick={() => assignTicket(t._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Assign
                  </button>

                  <Link className="text-blue-600 hover:underline" to={`/tickets/${t._id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
