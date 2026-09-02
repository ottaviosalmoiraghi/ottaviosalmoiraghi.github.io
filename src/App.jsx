import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import RecipesPage from "./pages/RecipesPage";
import RecipeDetail from "./pages/RecipeDetail";
import ShoppingListPage from "./pages/ShoppingListPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import RecipeEdit from "./pages/RecipeEdit";
import "./styles/App.css";
import ListMakerPage from "./pages/ListMakerPage";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Navigate to="/recipes" replace />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/shopping" element={<ShoppingListPage />} />
          <Route path="/mealplan" element={<MealPlannerPage />} />
          <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
          <Route path="/listmaker" element={<ListMakerPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
