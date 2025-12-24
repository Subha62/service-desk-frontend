// import React from 'react';
// import {ToastContainer} from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css"
// import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

// import Header from './components/Header';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import NewTicket from "./pages/NewTicket";
// import PrivateRoute from "./components/PrivateRoute";
// import Tickets from "./pages/Tickets";
// import Ticket from "./pages/Ticket";


// function App() {
//   return (
//     <>
//     <Router>
//       <div className="container">
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/new-ticket" element={<PrivateRoute />} >
//             <Route path="/new-ticket" element={<NewTicket />} />
//           </Route>
//           <Route path="/tickets" element={<PrivateRoute />} >
//             <Route path="/tickets" element={<Tickets />} />
//           </Route>
//           <Route path="/ticket/:ticketId" element={<PrivateRoute />} >
//             <Route path="/ticket/:ticketId" element={<Ticket/>} />
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//       <ToastContainer />

//     </>
//   );
// }

// export default App;



// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import CreateTicket from './pages/CreateTicket';
// import MyTickets from './pages/MyTickets';
// import TicketDetails from './pages/TicketDetails';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import Navbar from './components/Navbar';
// import AdminTickets from './pages/AdminTickets';
// import Home from './pages/Home';


// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route element={<ProtectedRoute />}>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/tickets/new" element={<CreateTicket />} />
//             <Route path="/tickets" element={<MyTickets />} />
//             <Route path="/tickets/:id" element={<TicketDetails />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/admin" element={<AdminTickets />} />
//           </Route>
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App;




import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTicket from './pages/CreateTicket';
import MyTickets from './pages/MyTickets';
import TicketDetails from './pages/TicketDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminTickets from './pages/AdminTickets';
import {ToastContainer}  from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto p-4">
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED USER ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<MyTickets />} />
            <Route path="/tickets/new" element={<CreateTicket />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route element={<ProtectedRoute adminOnly={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/tickets" element={<AdminTickets />} />
          </Route>

        </Routes>
      </div>
       <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default App;
