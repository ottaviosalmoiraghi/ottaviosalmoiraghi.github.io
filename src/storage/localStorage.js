// Carica tutte le ricette
export function loadRecipes() {
  return JSON.parse(localStorage.getItem("recipes") || "[]");
}

// Salva tutte le ricette
export function saveRecipes(recipes) {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Elimina una ricetta
export function deleteRecipe(id) {
  const recipes = loadRecipes();
  const updated = recipes.filter(r => r.id !== id);
  saveRecipes(updated);
  return updated; // utile per aggiornare lo stato
}

// === SHOPPING LIST ===

// Carica la lista
export function loadShoppingList() {
  return JSON.parse(localStorage.getItem("shopping") || "[]");
}

// Salva la lista
export function saveShoppingList(list) {
  localStorage.setItem("shopping", JSON.stringify(list));
}

// Aggiungi item
export function addShoppingItem(name) {
  const list = loadShoppingList();
  const newItem = {
    id: crypto.randomUUID(),
    name,
    checked: false
  };
  const updated = [...list, newItem];
  saveShoppingList(updated);
  return updated;
}

// Toggle check
export function toggleShoppingItem(id) {
  const list = loadShoppingList();
  const updated = list.map(item =>
    item.id === id ? { ...item, checked: !item.checked } : item
  );
  saveShoppingList(updated);
  return updated;
}

// Modifica item
export function updateShoppingItem(id, newName) {
  const list = loadShoppingList();
  const updated = list.map(item =>
    item.id === id ? { ...item, name: newName } : item
  );
  saveShoppingList(updated);
  return updated;
}

// Elimina item
export function deleteShoppingItem(id) {
  const list = loadShoppingList();
  const updated = list.filter(item => item.id !== id);
  saveShoppingList(updated);
  return updated;
}

// === MEAL PLANNER ===

export function loadMealPlan() {
  return JSON.parse(localStorage.getItem("mealPlan") || "{}");
}

export function saveMealPlan(plan) {
  localStorage.setItem("mealPlan", JSON.stringify(plan));
}

export function addMealToDay(dateKey, mealId, type) {
  const plan = loadMealPlan();

  const day = plan[dateKey] || { lunch: [], dinner: [] };

  const updatedDay = {
    ...day,
    [type]: [...day[type], mealId]
  };

  const updated = { ...plan, [dateKey]: updatedDay };
  saveMealPlan(updated);
  return updated;
}


export function removeMealFromDay(dateKey, type, index) {
  const plan = loadMealPlan();
  const day = plan[dateKey] || { lunch: [], dinner: [] };

  const updatedDay = {
    ...day,
    [type]: day[type].filter((_, i) => i !== index)
  };

  const updated = { ...plan, [dateKey]: updatedDay };
  saveMealPlan(updated);
  return updated;
}
