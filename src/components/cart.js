import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // Lógica para finalizar o pedido
    alert("Pedido finalizado com sucesso!");
    clearCart();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Carrinho de Compras</h2>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          {cart.map((product, index) => (
            <div key={index} className="border p-4 mb-4">
              <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mb-4" />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>{product.price}</p>
              <button 
                className="bg-red-500 text-white p-2 mt-2"
                onClick={() => removeFromCart(product._id)}
              >
                Remover
              </button>
            </div>
          ))}
          <button 
            className="bg-green-500 text-white p-2 mt-2"
            onClick={handleCheckout}
          >
            Finalizar Pedido
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;