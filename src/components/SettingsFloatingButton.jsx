import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

export default function SettingsFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="settings-float">
      <button
        className="settings-icon"
        onClick={() => setOpen(!open)}
      >
        ⚙️
      </button>

      {open && (
        <div className="settings-menu">
          <Link to="/import-json" className="settings-item">
            Importa JSON
          </Link>
          <Link to="/export-json" className="settings-item">
            Esporta JSON
          </Link>
        </div>
      )}
    </div>
  );
}
