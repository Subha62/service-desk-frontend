import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import logo from "../assets/Service Desk Png.png";   

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Service Desk Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold tracking-wide">Service Desk</span>
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-6 text-lg">
          {user ? (
            <li>
              <button
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition font-medium"
                onClick={onLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="flex items-center gap-2 hover:text-blue-300 transition">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center gap-2 hover:text-blue-300 transition">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;




