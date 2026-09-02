import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetail from "./pages/RecipeDetail";
import ShoppingListPage from "./pages/ShoppingListPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import RecipeEdit from "./pages/RecipeEdit";
import "./styles/App.css";
import ListMakerPage from "./pages/ListMakerPage";
import ImportPage from "./pages/ImportPage";
import ExportPage from "./pages/ExportPage";
import SettingsFloatingButton from "./components/SettingsFloatingButton";

export default function App() {
  return (
    <>
      <HashRouter>
        <NavBar />
        <SettingsFloatingButton />
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/shopping" element={<ShoppingListPage />} />
          <Route path="/mealplan" element={<MealPlannerPage />} />
          <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
          <Route path="/listmaker" element={<ListMakerPage />} />
          <Route path="/import-json" element={<ImportPage />} />
          <Route path="/export-json" element={<ExportPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}
