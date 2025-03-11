import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const products = [
    { name: "Café Expresso", price: "R$ 5,00", image: "/images/cafeexpresso.jpg", category: "Bebidas Quentes" },
    { name: "Cappuccino", price: "R$ 12,00", image: "/images/capuccinotradicional.jpg", category: "Bebidas Quentes" },
    { name: "Chocolate Quente", price: "R$ 15,00", image: "/images/chocolatequente.jpg", category: "Bebidas Quentes" },
    { name: "Frappuccino de Caramelo", price: "R$ 18,00", image: "/images/frapuccinocaramelo.jpg", category: "Bebidas Frias" },
    { name: "Chá Gelado de Limão", price: "R$ 8,00", image: "/images/chadelimao.jpg", category: "Bebidas Frias" },
    { name: "Smoothie de Morango", price: "R$ 16,00", image: "/images/smoothiedemorango.jpg", category: "Bebidas Frias" },
    { name: "Croissant de Queijo", price: "R$ 10,00", image: "/images/croissantqueijo.jpg", category: "Salgados" },
    { name: "Sanduíche Natural", price: "R$ 14,00", image: "/images/sanduichenatural.jpg", category: "Salgados" },
    { name: "Bolo de Cenoura", price: "R$ 7,00", image: "/images/bolocenouraechocolate.jpg", category: "Doces" },
    { name: "Cheesecake de Frutas Vermelhas", price: "R$ 15,00", image: "/images/cheesecake.jpg", category: "Doces" },
    { name: "Torta de Limão", price: "R$ 12,00", image: "/images/tortadelimao.jpg", category: "Doces" },
    { name: "Brownie de Chocolate com Sorvete", price: "R$ 18,00", image: "/images/browniecomsorvete.jpg", category: "Doces" }
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { addToCart } = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);

  // Filtro de produtos com base na busca e na categoria selecionada
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category ? product.category === category : true)
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div>
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Buscar por nome" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="border p-2"
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="border p-2 ml-2"
        >
          <option value="">Todas as categorias</option>
          <option value="Bebidas Quentes">Bebidas Quentes</option>
          <option value="Bebidas Frias">Bebidas Frias</option>
          <option value="Salgados">Salgados</option>
          <option value="Doces">Doces</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.name} className="border p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-xl font-semibold">{product.price}</p>
              <button 
                className="bg-brown-800 text-white p-2 mt-2 hover:bg-brown-600"
                onClick={() => handleAddToCart(product)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">Nenhum produto encontrado.</p>
        )}
      </div>
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">
          Item adicionado ao carrinho!
        </div>
      )}
    </div>
  );
};

export default ProductList;
