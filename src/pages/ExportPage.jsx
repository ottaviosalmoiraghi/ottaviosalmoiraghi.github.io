import { exportRecipesJSON } from "../storage/localStorage";

export default function ExportPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Esporta ricette in JSON</h2>

      <button onClick={exportRecipesJSON}>
        Scarica file JSON
      </button>
    </div>
  );
}
