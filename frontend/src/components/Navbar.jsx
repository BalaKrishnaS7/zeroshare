import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";


export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-slate-900 text-white shadow">
      <h1 className="text-xl font-bold">Zer0Share</h1>

      <div className="flex items-center gap-4">
        <DarkModeToggle />

        <span
          className={`px-3 py-1 rounded text-sm font-semibold ${
            role === "admin" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {role?.toUpperCase()}
        </span>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

    </nav>
  );
}
