// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from "../assets/service-desk-logo.png";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const getUser = () => {
//     const savedUser = localStorage.getItem("user");
//     if (!savedUser || savedUser === "undefined") return null;

//     try {
//       return JSON.parse(savedUser);
//     } catch (err) {
//       console.error("Invalid user JSON:", err);
//       return null;
//     }
//   };

//   const user = getUser();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="container mx-auto p-4 flex justify-between items-center">
        
//         {/* LEFT: Logo + Title */}
//         <Link to="/" className="flex items-center gap-3">
//           <img src={logo} alt="Service Desk Logo" className="h-10 w-auto" />
//           <span className="font-bold text-xl">Service Desk</span>
//         </Link>

//         {/* RIGHT: Menu */}
//         <div className="space-x-4">
//           {user ? (
//             <>
//               <Link to="/tickets" className="hover:underline">My Tickets</Link>
//               {user.isAdmin && <Link to="/admin" className="hover:underline">Admin</Link>}
//               <button onClick={logout} className="ml-4 text-red-500">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:underline">Login</Link>
//               <Link to="/register" className="hover:underline">Register</Link>
//             </>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// }




// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from "../assets/service-desk-logo.png";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const getUser = () => {
//     const savedUser = localStorage.getItem("user");
//     if (!savedUser || savedUser === "undefined") return null;

//     try {
//       return JSON.parse(savedUser);
//     } catch {
//       return null;
//     }
//   };

//   const user = getUser();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-slate-900 text-white shadow-lg">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
//         {/* LEFT: Logo + Title */}
//         <Link to="/" className="flex items-center gap-3">
//           <img src={logo} alt="Service Desk Logo" className="h-10 w-auto drop-shadow-md" />
//           <span className="text-2xl font-semibold tracking-wide">Service Desk</span>
//         </Link>

//         {/* RIGHT: Menu */}
//         <div className="flex items-center gap-6 text-lg">
          
//           {user ? (
//             <>
//               <Link to="/tickets" className="hover:text-blue-400 transition">
//                 My Tickets
//               </Link>
              
//               {/* 🔥 Only admin sees Admin Panel */}
//               {user.isAdmin && (
//                 <Link to="/admin" className="hover:text-blue-400 transition">
//                   Admin Panel
//                 </Link>
//               )}

//               <button 
//                 onClick={logout} 
//                 className="px-4 py-2 text-red-400 border border-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
//               <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
//             </>
//           )}

//         </div>

//       </div>
//     </nav>
//   );
// }



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/service-desk-logo.png";

export default function Navbar() {
  const navigate = useNavigate();

  const getUser = () => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser || savedUser === "undefined") return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  };

  const user = getUser();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LEFT: Logo + Title */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Service Desk Logo" className="h-10 w-auto drop-shadow-md" />
          <span className="text-2xl font-semibold tracking-wide">Service Desk</span>
        </Link>

        {/* RIGHT: Menu */}
        <div className="flex items-center gap-6 text-lg">

          {user ? (
            <>
              {/* 🔥 Show My Tickets ONLY for normal users */}
              {!user.isAdmin && (
                <Link to="/tickets" className="hover:text-blue-400 transition">
                  My Tickets
                </Link>
              )}

              {/* 🔥 Show Admin Panel ONLY for admin */}
              {user.isAdmin && (
                <Link to="/admin" className="hover:text-blue-400 transition">
                  Admin Panel
                </Link>
              )}

              {/* Logout */}
              <button 
                onClick={logout} 
                className="px-4 py-2 text-red-400 border border-red-400 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}

