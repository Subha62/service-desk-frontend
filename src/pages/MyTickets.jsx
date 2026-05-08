// import React, { useEffect, useState } from 'react';
// import api from '../api/axios';
// import { Link } from 'react-router-dom';

// export default function MyTickets() {
//   const [tickets, setTickets] = useState([]);

//   useEffect(()=> {
//     (async ()=> {
//       try {
//         const { data } = await api.get('/tickets/me', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setTickets(data);
//       } catch (err) { console.error(err); }
//     })();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">My Tickets</h2>
//       <div className="space-y-3">
//         {tickets.map(t => (
//           <div key={t._id} className="bg-white p-4 rounded shadow flex justify-between">
//             <div>
//               <Link to={`/tickets/${t._id}`} className="font-semibold text-blue-600">{t.title}</Link>
//               <div className="text-sm text-gray-600">{t.priority} • {t.status}</div>
//             </div>
//             <div>{new Date(t.createdAt).toLocaleString()}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import { Link } from "react-router-dom";

// export default function MyTickets() {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await api.get("/tickets/me", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setTickets(data);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, []);

//   // 🎨 Status color badges
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "open":
//         return "bg-green-100 text-green-700 border border-green-300";
//       case "in progress":
//         return "bg-yellow-100 text-yellow-700 border border-yellow-300";
//       case "closed":
//         return "bg-red-100 text-red-700 border border-red-300";
//       default:
//         return "bg-gray-100 text-gray-700 border border-gray-300";
//     }
//   };

//   // 🎨 Priority colors
//   const getPriorityColor = (priority) => {
//     switch (priority?.toLowerCase()) {
//       case "low":
//         return "text-green-600";
//       case "medium":
//         return "text-yellow-600";
//       case "high":
//         return "text-red-600";
//       default:
//         return "text-gray-700";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h2 className="text-3xl font-bold mb-6 text-slate-800">My Tickets</h2>

//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="min-w-full text-left">
//           <thead className="bg-slate-800 text-white">
//             <tr>
//               <th className="px-6 py-3">Ticket ID</th>
//               <th className="px-6 py-3">Title</th>
//               <th className="px-6 py-3">Priority</th>
//               <th className="px-6 py-3">Status</th>
//               <th className="px-6 py-3">Created</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {tickets.map((t) => (
//               <tr key={t._id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4 font-mono text-sm">{t._id}</td>

//                 <td className="px-6 py-4 font-semibold text-blue-600">
//                   <Link to={`/tickets/${t._id}`}>{t.title}</Link>
//                 </td>

//                 <td className={`px-6 py-4 capitalize font-medium ${getPriorityColor(t.priority)}`}>
//                   {t.priority}
//                 </td>

//                 <td className="px-6 py-4">
//                   <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(t.status)}`}>
//                     {t.status}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4 text-gray-600">
//                   {new Date(t.createdAt).toLocaleString()}
//                 </td>

//                 <td className="px-6 py-4">
//                   <Link className="text-blue-600 hover:underline" to={`/tickets/${t._id}`}>
//                     View
//                   </Link>
//                 </td>
//               </tr>
//             ))}

//             {tickets.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="px-6 py-6 text-center text-gray-500">
//                   No tickets found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/tickets/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTickets(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  //  Status color badges
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

  //  Priority colors
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">My Tickets</h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="px-6 py-3">Ticket ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Priority</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Created</th>
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
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(t.status)}`}>
                    {t.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(t.createdAt).toLocaleString()}
                </td>

                <td className="px-6 py-4">
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
