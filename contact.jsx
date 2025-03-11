import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("http://seu-backend.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", message: "" });

        // Ocultar a mensagem após 5 segundos
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("Erro ao enviar mensagem.");
      }
    } catch (error) {
      setStatus("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div>
      <h2>Entre em contato</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Seu email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Mensagem:</label>
        <textarea
          name="message"
          placeholder="Digite sua mensagem..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Enviar</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default Contact;
