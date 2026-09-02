import { useState } from "react";
import { Link } from "react-router-dom";
import {
  loadRecipes,
  saveRecipes,
  deleteRecipe,
} from "../storage/localStorage.js";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState(loadRecipes());
  const [title, setTitle] = useState("");

  function addRecipe() {
    if (!title.trim()) return;

    const newRecipe = {
      id: crypto.randomUUID(),
      title,
      ingredients: [],
      instructions: "",
    };

    const updated = [...recipes, newRecipe];
    setRecipes(updated);
    saveRecipes(updated);
    setTitle("");
  }

  function remove(id) {
    const updated = deleteRecipe(id);
    setRecipes(updated);
  }

  return (
    <div className="navbar-space page">
      <h1>Ricette</h1>

      <div className="add-recipe-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome ricetta"
        />
        <button onClick={addRecipe}>Aggiungi</button>
      </div>

      <ul className="recipe-list">
        {recipes.map((r) => (
          <li key={r.id} className="recipe-card">
            <Link to={`/recipes/${r.id}`} className="recipe-link">
              {r.title}
            </Link>

            <button className="delete-btn" onClick={() => remove(r.id)}>
              Elimina
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
