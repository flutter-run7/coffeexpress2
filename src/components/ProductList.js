import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const products = [
    { name: "Café Expresso", price: "R$ 5,00", image: "/images/cafeexpresso.jpg" },
    { name: "Cappuccino", price: "R$ 12,00", image: "/images/capuccinotradicional.jpg" },
    { name: "Chocolate Quente", price: "R$ 15,00", image: "/images/chocolatequente.jpg" },
    { name: "Frappuccino de Caramelo", price: "R$ 18,00", image: "/images/frapuccinocaramelo.jpg"},
    { name: "Chá Gelado de Limão", price: "R$ 8,00", image: "/images/chadelimao.jpg"},
    { name: "Smoothie de Morango", price: "R$ 16,00", image: "/images/smoothiedemorango.jpg"},
    { name: "Croissant de Queijo", price: "R$ 10,00", image: "/images/croissantqueijo.jpg"},
    { name: "Sanduíche Natural", price: "R$ 14,00", image: "/images/sanduichenatural.jpg"},
    { name: "Bolo de Cenoura", price: "R$ 7,00", image: "/images/bolocenouraechocolate.jpg"},
    { name: "cheesecake de frutas vermelhas", price: "R$ 15,00", image: "/images/cheesecake.jpg"},
    { name: "Torta de Limão", price: "R$ 12,00", image: "/images/tortadelimao.jpg"},
    { name: "Brownie de Chocolate com Sorvete", price: "R$ 18,00", image: "/images/browniecomsorvete.jpg"}
  ];

  
  const [, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { addToCart } = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:5001/api/products");
      setProducts(response.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product._id} className="border p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-xl font-semibold">{product.price}</p>
              <button 
                className="bg-brown-800 text-white p-2 mt-2 hover:bg-brown-600"
                onClick={() => handleAddToCart(product)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      )}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">
          Item adicionado ao carrinho!
        </div>
      )}
    </div>
  );
};

export default ProductList;