import { useState } from "react";
import { addShoppingItem } from "../storage/localStorage.js";

export default function ListMakerPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selected, setSelected] = useState([]);

  // Carico meal plan e ricette
  const mealPlan = JSON.parse(localStorage.getItem("mealPlan") || "{}");
  const recipes = JSON.parse(localStorage.getItem("recipes") || "[]");

  function normalizeDay(day) {
    const parts = day.split("-");
    const yyyy = parts[0];
    const mm = parts[1].padStart(2, "0");
    const dd = parts[2].padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function generateList() {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    let recipeIds = [];

    Object.keys(mealPlan).forEach((day) => {
      const normalized = normalizeDay(day);
      const dayDate = new Date(normalized);

      if (!isNaN(dayDate) && dayDate >= start && dayDate <= end) {
        const dayMeals = mealPlan[day];

        // Se il giorno ha la nuova struttura PRANZO/CENA
        if (dayMeals && typeof dayMeals === "object") {
          recipeIds.push(...(dayMeals.lunch || []));
          recipeIds.push(...(dayMeals.dinner || []));
        }

        // Se il giorno ha la vecchia struttura (array)
        else if (Array.isArray(dayMeals)) {
          recipeIds.push(...dayMeals);
        }
      }
    });

    // Filtra ID invalidi
    recipeIds = recipeIds.filter((id) => id && id.trim() !== "");

    const selectedRecipes = recipes.filter((r) => recipeIds.includes(r.id));

    const validRecipes = selectedRecipes.filter(Boolean);

    const allIngredients = new Set();

    validRecipes.forEach((r) => {
      if (!r.ingredients) return;
      r.ingredients.forEach((ing) => {
        if (ing?.name && ing.name.trim() !== "") {
          allIngredients.add(ing.name.trim());
        }
      });
    });

    setIngredients([...allIngredients]);
  }

  function toggleIngredient(name) {
    if (selected.includes(name)) {
      setSelected(selected.filter((i) => i !== name));
    } else {
      setSelected([...selected, name]);
    }
  }

  // ...

  function sendToShoppingList() {
    const missing = ingredients
      .filter((i) => !selected.includes(i))
      .filter((i) => i && i.trim() !== "");

    missing.forEach((name) => {
      addShoppingItem(name.trim());
    });
  }

  return (
    <div className="page">
      <h1>List Maker</h1>

      <div className="recipe-section">
        <h2>Seleziona intervallo</h2>

        <input
          type="date"
          className="meal-select"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="meal-select"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button className="add-db-meal-btn" onClick={generateList}>
          Genera lista ingredienti
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className="recipe-section">
          <h2>Ingredienti trovati</h2>

          <ul className="ingredients-list">
            {ingredients.map((ing) => (
              <li key={ing} className="meal-item">
                <span>{ing}</span>
                <button
                  className="meal-delete"
                  onClick={() => toggleIngredient(ing)}
                >
                  {selected.includes(ing) ? "✔" : "✖"}
                </button>
              </li>
            ))}
          </ul>

          <button className="edit-recipe-btn" onClick={sendToShoppingList}>
            Aggiungi alla lista della spesa
          </button>
        </div>
      )}
    </div>
  );
}
