// // import React, { useState } from 'react';
// // import api from '../api/axios';
// // import { useNavigate } from 'react-router-dom';

// // export default function CreateTicket() {
// //   const [title, setTitle] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [priority, setPriority] = useState('Low');
// //   const nav = useNavigate();

// //   const submit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await api.post('/tickets', { title, description, priority }, {
// //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
// //       });
// //       nav('/tickets');
// //     } catch (err) {
// //       alert(err.response?.data?.message || 'Failed to create ticket');
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
// //       <h2 className="text-xl font-bold mb-4">Create Ticket</h2>
// //       <form onSubmit={submit} className="space-y-3">
// //         <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
// //         <textarea className="w-full p-2 border rounded" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
// //         <select value={priority} onChange={e=>setPriority(e.target.value)} className="p-2 border rounded">
// //           <option>Low</option>
// //           <option>Medium</option>
// //           <option>High</option>
// //         </select>
// //         <button className="w-full bg-blue-600 text-white p-2 rounded">Create</button>
// //       </form>
// //     </div>
// //   );
// // }




import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/tickets",
        { title, description, priority },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Ticket created successfully! 🎉");
      nav("/tickets");
    } catch (err) {
     toast.alert(err.response?.data?.message || "Failed to create ticket ❌");
    }
  };

     
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-2xl animate-fadeIn">

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-6">
          Create a Support Ticket
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Describe your issue and set a priority level.
        </p>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6">

          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Enter the ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              className="w-full p-3 h-32 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="Describe your issue in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Priority Selector */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none bg-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-lg shadow-lg transform hover:-translate-y-1 transition-all"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}




