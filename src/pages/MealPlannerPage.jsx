import { useState } from "react";
import {
  loadMealPlan,
  addMealToDay,
  removeMealFromDay,
  loadRecipes,
} from "../storage/localStorage.js";

export default function MealPlannerPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [mealPlan, setMealPlan] = useState(loadMealPlan());
  const [newMeal, setNewMeal] = useState("");
  const [recipes, setRecipes] = useState(loadRecipes());
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [mealType, setMealType] = useState("lunch");
  const dayKey = `${currentYear}-${currentMonth + 1}-${selectedDay}`;
  const dayMeals = mealPlan[dayKey] || { lunch: [], dinner: [] };

  const monthNames = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];

  function changeMonth(delta) {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(null);
  }

  function getCalendarDays() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const startWeekday = (firstDay.getDay() + 6) % 7; // Lunedì=0
    const daysInMonth = lastDay.getDate();

    const days = [];

    for (let i = 0; i < startWeekday; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }

    return days;
  }

  function handleAddMeal() {
    if (!newMeal.trim() || !selectedDay) return;

    const dateKey = `${currentYear}-${currentMonth + 1}-${selectedDay}`;

    // 1. Genera ID
    const id = crypto.randomUUID();

    // 2. Crea ricetta manuale
    const manualRecipe = {
      id,
      title: newMeal.trim(),
      ingredients: [], // puoi aggiungere ingredienti in futuro
    };

    // 3. Salva nel DB locale
    const allRecipes = loadRecipes();
    const updatedRecipes = [...allRecipes, manualRecipe];
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    setRecipes(updatedRecipes);

    // 4. Salva l’ID nel Meal Planner
    const updatedPlan = addMealToDay(dateKey, id, mealType);
    setMealPlan(updatedPlan);

    // 5. Reset input
    setNewMeal("");
  }

  const days = getCalendarDays();

  return (
    <div className="page navbar-space">
      <h1>Meal Planner</h1>

      {/* Barra mese */}
      <div className="month-bar">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <span>
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      {/* Giorni settimana */}
      <div className="week-header">
        <div>Lun</div>
        <div>Mar</div>
        <div>Mer</div>
        <div>Gio</div>
        <div>Ven</div>
        <div>Sab</div>
        <div>Dom</div>
      </div>

      {/* Calendario */}
      <div className="calendar-grid">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`calendar-day ${day === selectedDay ? "selected" : ""}`}
            onClick={() => day && setSelectedDay(day)}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Sezione aggiunta pasti */}
      {selectedDay && (
        <div className="meal-add-wrapper">
          {/* Pulsante + che apre/chiude la sezione */}
          <button
            className="meal-toggle-btn"
            onClick={() => setShowAddSection(!showAddSection)}
          >
            +
          </button>

          {/* Sezione aggiunta pasti (visibile solo se showAddSection = true) */}
          {showAddSection && (
            <div className="meal-add-section">
              {/* Aggiunta manuale */}
              <input
                value={newMeal}
                onChange={(e) => setNewMeal(e.target.value)}
                placeholder="Aggiungi ricetta"
              />
              <button onClick={handleAddMeal}>Aggiungi</button>

              {/* Aggiunta da DB */}
              <select
                value={selectedRecipe || ""}
                onChange={(e) => setSelectedRecipe(e.target.value)}
                className="meal-select"
              >
                <option value="">Scegli ricetta dal DB</option>
                {recipes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>

              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="meal-type-select"
              >
                <option value="lunch">Pranzo</option>
                <option value="dinner">Cena</option>
              </select>

              <button
                className="add-db-meal-btn"
                onClick={() => {
                  if (!selectedRecipe) return;
                  const dateKey = `${currentYear}-${currentMonth + 1}-${selectedDay}`;
                  const updated = addMealToDay(
                    dateKey,
                    selectedRecipe,
                    mealType,
                  );
                  setMealPlan(updated);
                  setSelectedRecipe("");
                }}
              >
                Aggiungi ricetta
              </button>
            </div>
          )}

          {/* Lista pasti del giorno */}
          <h3>Pranzo</h3>
          <ul className="meal-list">
            {dayMeals.lunch.map((meal, i) => (
              <li key={i} className="meal-item">
                <span>{recipes.find((r) => r.id === meal)?.title || meal}</span>
                <button
                  className="delete-btn"
                  onClick={() => {
                    const updated = removeMealFromDay(dayKey, "lunch", i);
                    setMealPlan(updated);
                  }}
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
          <h3>Cena</h3>
          <ul className="meal-list">
            {dayMeals.dinner.map((meal, i) => (
              <li key={i} className="meal-item">
                <span>{recipes.find((r) => r.id === meal)?.title || meal}</span>
                <button
                  className="delete-btn"
                  onClick={() => {
                    const updated = removeMealFromDay(dayKey, "dinner", i);
                    setMealPlan(updated);
                  }}
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
