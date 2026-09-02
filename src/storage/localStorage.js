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
    [type]: [...(day[type] || []), mealId]
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

// =========================
// EXPORT RICETTE → JSON FILE
// =========================
export async function exportRecipesJSON() {
  const recipes = loadRecipes(); // le tue ricette da localStorage/IndexedDB

  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    recipes
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "recipes-backup.json";
  a.click();

  URL.revokeObjectURL(url);
}


// =========================
// IMPORT RICETTE ← JSON FILE
// =========================
export async function importRecipesJSON(file, { mode = "merge" } = {}) {
  const text = await file.text();
  const json = JSON.parse(text);

  if (!json.recipes || !Array.isArray(json.recipes)) {
    throw new Error("File JSON non valido: manca 'recipes'.");
  }

  const current = loadRecipes();

  let final;

  if (mode === "overwrite") {
    final = json.recipes;
  } else {
    // MERGE: evita duplicati per ID
    const map = new Map();
    current.forEach(r => map.set(r.id, r));
    json.recipes.forEach(r => map.set(r.id, r));
    final = Array.from(map.values());
  }

  saveRecipes(final);

  return final.length;
}
