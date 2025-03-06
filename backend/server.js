// filepath: /c:/CoffeExpress/backend/server.js
// filepath: /c:/CoffeExpress/backend/server.js
// filepath: /c:/CoffeExpress/backend/server.js
// filepath: /c:/CoffeExpress/backend/server.js
// filepath: /c:/CoffeExpress/backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// Configurar o Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Substitua pelo seu email do Gmail
    pass: process.env.EMAIL_PASS // Substitua pela sua senha do Gmail
  }
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Substitua pelo seu email do Gmail
    subject: `Mensagem de ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar email:", error);
      res.status(500).json({ error: "Erro ao enviar email" });
    } else {
      console.log("Email enviado:", info.response);
      res.status(200).json({ message: "Mensagem enviada com sucesso!" });
    }
  });
});

// Conectar ao MongoDB
console.log("Tentando conectar ao MongoDB com a URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch(err => {
    console.error("Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });

// Modelo do Produto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
});

const Product = mongoose.model("Product", productSchema);

// Rota para listar produtos com busca e filtro por categoria
app.get("/api/products", async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" }; // Busca por nome (case insensitive)
    }

    if (category) {
      query.category = category; // Filtro por categoria
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

module.exports = { Product };



//matheusprogramacao7        password: ILgZaHlJrvvzsQua (7m9QenpXitNI8qem)    (Atlas MONGODB)


// mongosh "mongodb+srv://nuvemcluster.hyayc.mongodb.net/" --apiVersion 1 --username matheusprogramacao7 --password ILgZaHlJrvvzsQua