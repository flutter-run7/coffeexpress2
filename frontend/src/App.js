import React from "react";
import { Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import "./App.css";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brown-800 text-white py-4 px-6 shadow-lg flex justify-between items-center">
        <h1 className="text-2xl font-bold">CoffeExpress</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Início</Link></li>
            <li><Link to="/" className="hover:underline">Cardápio</Link></li>
            <li><Link to="/contact" className="hover:underline">Contato</Link></li>
            <li><Link to="/cart" className="hover:underline">Carrinho</Link></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-6">
        <h2 className="text-xl font-semibold mb-4">Cardápio Principal:</h2>
        <ProductList />
      </main>
      <footer className="bg-gray-900 text-white text-center py-4 mt-6">
        <p>&copy; 2025 CoffeExpress. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;