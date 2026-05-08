// import React, { useState } from "react";
// import api from "../api/axios";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post("/auth/login", { email, password });

//       // Save login data
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       //  Redirect ALL users to Dashboard
//       nav("/dashboard");
      
//     //Show success toast
//    toast.success("Login Successful 🎉");

//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-100 flex items-center justify-center p-4">
//       <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-lg animate-fadeIn">
        
//         <h2 className="text-4xl font-extrabold text-indigo-700 text-center mb-6">Login</h2>
        
//         <p className="text-gray-600 text-center mb-8">
//           Welcome back! Please enter your credentials.
//         </p>

//         <form onSubmit={submit} className="space-y-6">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-lg shadow-lg transform hover:-translate-y-1 transition-all"
//           >
//             Login
//           </button>
//         </form>

//         <div className="text-center mt-6">
//           <p className="text-gray-600">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-indigo-700 font-bold hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      // Save login data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Role based redirect
      if (data.user.role === "admin") {
        nav("/admin");
      } else if (data.user.role === "technician") {
        nav("/technician");
      } else {
        nav("/dashboard");
      }

      // Success message
      toast.success("Login Successful 🎉");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-lg animate-fadeIn">

        <h2 className="text-4xl font-extrabold text-indigo-700 text-center mb-6">
          Login
        </h2>

        <p className="text-gray-600 text-center mb-8">
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={submit} className="space-y-6">

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>

            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold text-lg shadow-lg transform hover:-translate-y-1 transition-all"
          >
            Login
          </button>

        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-700 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}