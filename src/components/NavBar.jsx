import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const { pathname } = useLocation();

  return (
    <nav className="tabbar">
      <Link
        to="/recipes"
        className={`tab-item ${pathname === "/recipes" ? "active" : ""}`}
      >
        🍽 Ricette
      </Link>

      <Link
        to="/shopping"
        className={`tab-item ${pathname === "/shopping" ? "active" : ""}`}
      >
        🛒 Lista
      </Link>

      <Link
        to="/mealplan"
        className={`tab-item ${pathname === "/mealplan" ? "active" : ""}`}
      >
        📅 Planner
      </Link>
      <Link 
      to="/listmaker" 
      className={`tab-item ${pathname === "/listmaker" ? "active" : ""}`}
      >
        🧺 Genera Lista
      </Link>
    </nav>
  );
}
