import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProductPage from "./pages/Product";
import AdminPage from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<RegisterPage />} />
        <Route path="/user/products" element={<ProductPage/>} />
        <Route path={"/admin/products"} element={<AdminPage/>} />
        <Route path={"/admin/products/newProduct"} element={<AddProduct/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
