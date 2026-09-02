import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const saved = JSON.parse(localStorage.getItem("recipes") || "[]");
  const found = saved.find((r) => r.id === id);

  const [title, setTitle] = useState(found?.title || "");
  const [ingredients, setIngredients] = useState(found?.ingredients || []);
  const [instructions, setInstructions] = useState(found?.instructions || "");

  const [newIngName, setNewIngName] = useState("");
  const [newIngQty, setNewIngQty] = useState("");

  if (!found) return <p>Ricetta non trovata.</p>;

  function addIngredient() {
    if (!newIngName.trim()) return;

    const updated = [
      ...ingredients,
      { name: newIngName, quantity: newIngQty }
    ];

    setIngredients(updated);
    setNewIngName("");
    setNewIngQty("");
  }

  function removeIngredient(index) {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function saveRecipe() {
    const updatedRecipe = {
      ...found,
      title,
      ingredients,
      instructions
    };

    const updatedList = saved.map(r =>
      r.id === id ? updatedRecipe : r
    );

    localStorage.setItem("recipes", JSON.stringify(updatedList));
    navigate(`/recipes/${id}`);
  }

  return (
    <div className="page navbar-space">
      <h1>Modifica ricetta</h1>

      {/* TITOLO */}
      <div className="recipe-section">
        <h2>Titolo</h2>
        <input
          className="add-recipe-box input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome ricetta"
        />
      </div>

      {/* INGREDIENTI */}
      <div className="recipe-section">
        <h2>Ingredienti</h2>

        <ul className="ingredients-list">
          {ingredients.map((ing, i) => (
            <li key={i} className="meal-item">
              <span>{ing.name} — {ing.quantity}</span>
              <button
                className="meal-delete"
                onClick={() => removeIngredient(i)}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>

        <input
          className="meal-select"
          value={newIngName}
          onChange={(e) => setNewIngName(e.target.value)}
          placeholder="Ingrediente"
        />

        <input
          className="meal-select"
          value={newIngQty}
          onChange={(e) => setNewIngQty(e.target.value)}
          placeholder="Quantità"
        />

        <button className="add-db-meal-btn" onClick={addIngredient}>
          Aggiungi ingrediente
        </button>
      </div>

      {/* ISTRUZIONI */}
      <div className="recipe-section">
        <h2>Istruzioni</h2>
        <textarea
          className="instructions-box"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={6}
          placeholder="Scrivi le istruzioni..."
        />
      </div>

      {/* SALVA */}
      <button className="edit-recipe-btn" onClick={saveRecipe}>
        Salva modifiche
      </button>
    </div>
  );
}
