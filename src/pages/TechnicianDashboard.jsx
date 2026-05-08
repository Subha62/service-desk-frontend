import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function TechnicianDashboard() {

  const [tickets, setTickets] = useState([]);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetchAssignedTickets();

  }, []);

  // Fetch Assigned Tickets
  const fetchAssignedTickets = async () => {

    try {

      const { data } = await api.get(
        "/tickets/assigned/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTickets(data);

    } catch (error) {
      console.log(error);
    }
  };

  // Update Ticket Status
  const updateStatus = async (ticketId, status) => {

    try {

      await api.put(
        `/tickets/${ticketId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAssignedTickets();

    } catch (error) {
      console.log(error);
    }
  };

  // Add Comment
  const addComment = async (ticketId) => {

    if (!commentText.trim()) return;

    try {

      await api.post(
        `/tickets/${ticketId}/comments`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentText("");

      fetchAssignedTickets();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Page Title */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold text-indigo-700">
          Technician Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage assigned support tickets efficiently.
        </p>

      </div>

      {/* No Tickets */}
      {tickets.length === 0 ? (

        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">

          <h2 className="text-2xl font-bold text-gray-700">
            No Assigned Tickets
          </h2>

          <p className="text-gray-500 mt-2">
            Assigned tickets will appear here.
          </p>

        </div>

      ) : (

        tickets.map((ticket) => (

          <div
            key={ticket._id}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 hover:shadow-2xl transition-all"
          >

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold text-indigo-700">
                  {ticket.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {ticket.description}
                </p>

              </div>

              <div className="mt-4 md:mt-0">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    ticket.priority === "High"
                      ? "bg-red-100 text-red-600"
                      : ticket.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {ticket.priority} Priority
                </span>

              </div>

            </div>

            {/* Ticket Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

              <div className="bg-gray-100 p-4 rounded-xl">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="font-bold text-lg">
                  {ticket.status}
                </p>

              </div>

              <div className="bg-gray-100 p-4 rounded-xl">

                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="font-bold text-lg">
                  {ticket.category}
                </p>

              </div>

              <div className="bg-gray-100 p-4 rounded-xl">

                <p className="text-sm text-gray-500">
                  Created
                </p>

                <p className="font-bold text-lg">
                  {new Date(
                    ticket.createdAt
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-6">

              <button
                onClick={() =>
                  updateStatus(
                    ticket._id,
                    "In Progress"
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition-all"
              >
                In Progress
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    ticket._id,
                    "Resolved"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl transition-all"
              >
                Resolve
              </button>

            </div>

            {/* Comment Section */}
            <div className="mb-6">

              <textarea
                placeholder="Write a comment..."
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                rows="3"
                value={commentText}
                onChange={(e) =>
                  setCommentText(e.target.value)
                }
              />

              <button
                onClick={() =>
                  addComment(ticket._id)
                }
                className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
              >
                Add Comment
              </button>

            </div>

            {/* Comments */}
            <div>

              <h3 className="text-xl font-bold mb-4 text-gray-700">
                Comments
              </h3>

              {ticket.comments.length === 0 ? (

                <p className="text-gray-500">
                  No comments yet.
                </p>

              ) : (

                ticket.comments.map((comment, index) => (

                  <div
                    key={index}
                    className="bg-gray-50 border rounded-xl p-4 mb-3"
                  >

                    <div className="flex justify-between items-center mb-2">

                      <p className="font-semibold text-indigo-700">
                        {comment.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {new Date(
                          comment.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <p className="text-gray-700">
                      {comment.text}
                    </p>

                  </div>
                ))
              )}

            </div>

          </div>
        ))
      )}
    </div>
  );
}