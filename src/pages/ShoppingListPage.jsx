import { useState } from "react";
import {
  loadShoppingList,
  addShoppingItem,
  toggleShoppingItem,
  updateShoppingItem,
  deleteShoppingItem
} from "../storage/localStorage.js";

export default function ShoppingListPage() {
  const [list, setList] = useState(loadShoppingList());
  const [newItem, setNewItem] = useState("");

  function handleAdd() {
    if (!newItem.trim()) return;
    const updated = addShoppingItem(newItem.trim());
    setList(updated);
    setNewItem("");
  }

  function handleToggle(id) {
    const updated = toggleShoppingItem(id);
    setList(updated);
  }

  function handleEdit(id) {
    const current = list.find(i => i.id === id);
    const newName = prompt("Modifica nome:", current.name);
    if (!newName) return;
    const updated = updateShoppingItem(id, newName.trim());
    setList(updated);
  }

  function handleDelete(id) {
    const updated = deleteShoppingItem(id);
    setList(updated);
  }

return (
  <div className="page shopping-page navbar-space">

    {/* Barra aggiunta fissa */}
    <div className="shopping-add-bar">
    <h1>Lista della spesa</h1>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Aggiungi prodotto"
      />
      <button onClick={handleAdd}>+</button>
    </div>

    {/* Lista scrollabile */}
    <ul className="shopping-list">
      {list.map(item => (
        <li key={item.id} className="recipe-card">
          <span
            className={`shopping-item ${item.checked ? "checked" : ""}`}
            onClick={() => handleToggle(item.id)}
          >
            {item.name}
          </span>

          <div className="shopping-actions">
            <button className="edit-btn" onClick={() => handleEdit(item.id)}>
              ✏️
            </button>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              🗑
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}
