import Page from './app/dashboard/page'
import "./index.css"
import './App.css'
// ============ pages ===========
import Settings from './app/dashboard/Settings';
import Reports from './app/dashboard/Reports';
import Reviews from './app/dashboard/Reviews';
import Customers from './app/dashboard/Customers';
import Orders from './app/dashboard/Orders';
import Categories from './app/dashboard/Categories';
import Products from './app/dashboard/Products';
// =========== router ===========
import { Routes, Route } from "react-router-dom";


// ============ css ============
import "./index.css";
import "./App.css";

import { ThemeProvider } from "@/components/theme-provider"
function App() {
  return (
    <div >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
