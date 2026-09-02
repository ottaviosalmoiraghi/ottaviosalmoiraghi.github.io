import { importRecipesJSON } from "../storage/localStorage";

export default function ImportPage() {
  async function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const count = await importRecipesJSON(file, { mode: "merge" });
      alert(`Importate ${count} ricette`);
    } catch (err) {
      console.error("Errore import JSON:", err);
      alert("Errore nel file JSON");
      alert("Errore nel file JSON");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Importa ricette da JSON</h2>

      <input type="file" accept="application/json" onChange={handleImport} />
    </div>
  );
}
