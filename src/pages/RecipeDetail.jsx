import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Carico ricette dal localStorage
  const saved = JSON.parse(localStorage.getItem("recipes") || "[]");
  const found = saved.find((r) => r.id === id);

  const [recipe] = useState(found);

  if (!recipe) return <p>Ricetta non trovata.</p>;

  function deleteRecipe() {
    const updated = saved.filter((r) => r.id !== id);
    localStorage.setItem("recipes", JSON.stringify(updated));
    navigate("/recipes");
  }

  return (
    <div className="page navbar-space">
      <div className="recipe-detail">
        <h1>{recipe.title}</h1>

        {/* INGREDIENTI */}
        <div className="recipe-section">
          <h2>Ingredienti</h2>

          {recipe.ingredients.length === 0 ? (
            <p>Nessun ingrediente inserito.</p>
          ) : (
            <ul className="ingredients-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>
                  {ing.name} — {ing.quantity}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ISTRUZIONI */}
        <div className="recipe-section">
          <h2>Istruzioni</h2>

          <div className="instructions-box">
            {recipe.instructions?.trim()
              ? recipe.instructions
              : "Nessuna istruzione inserita."}
          </div>
        </div>

        {/* PULSANTI */}
        <button
          className="edit-recipe-btn"
          onClick={() => navigate(`/recipes/${id}/edit`)}
        >
          Modifica ricetta
        </button>

        <button className="delete-recipe-btn" onClick={deleteRecipe}>
          Elimina ricetta
        </button>
      </div>
    </div>
  );
}
