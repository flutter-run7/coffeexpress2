require("dotenv").config();
const mongoose = require("mongoose");
const { Product } = require("./server"); // Importa o modelo de Produto

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB conectado para o Seed");
  seedProducts();
}).catch(err => console.log(err));

// Função para adicionar produtos ao banco
const seedProducts = async () => {
  try {
    // Lista de produtos para adicionar
    const products = [
      {
        name: "Café Expresso",
        description: "Café moído, água quente.",
        price: 5.00,
        image: "/images/cafeexpresso.jpg",
        category: "Bebidas Quentes"
      },
      {
        name: "Cappuccino Tradicional",
        description: "Café expresso, leite vaporizado, espuma de leite, canela.",
        price: 12.00,
        image: "/images/capuccinotradicional.jpg",
        category: "Bebidas Quentes"
      },
      {
        name: "Chocolate Quente Cremoso",
        description: "Leite, chocolate em pó, creme de leite, açúcar, chantilly.",
        price: 15.00,
        image: "/images/chocolatequente.jpg",
        category: "Bebidas Quentes"
      },
      {
        name: "Frappuccino de Caramelo",
        description: "Café gelado, leite, gelo, calda de caramelo, chantilly.",
        price: 18.00,
        image: "/images/frapuccinocaramelo.jpg",
        category: "Bebidas Frias"
      },
      {
        name: "Chá Gelado de Limão",
        description: "Chá preto, limão, açúcar, gelo.",
        price: 8.00,
        image: "/images/chadelimao.jpg",
        category: "Bebidas Frias"
      },
      {
        name: "Smoothie de Morango",
        description: "Morango, leite, iogurte natural, mel, gelo.",
        price: 16.00,
        image: "/images/smoothiedemorango.jpg",
        category: "Bebidas Frias"
      },
      {
        name: "Croissant de Queijo",
        description: "Massa folhada, queijo mussarela.",
        price: 10.00,
        image: "/images/croissantqueijo.jpg",
        category: "Lanches e Snacks"
      },
      {
        name: "Sanduíche Natural",
        description: "Pão integral, frango desfiado, cenoura ralada, maionese, alface.",
        price: 14.00,
        image: "/images/sanduichenatural.jpg",
        category: "Lanches e Snacks"
      },
      {
        name: "Bolo de Cenoura com Cobertura de Chocolate",
        description: "Cenoura, farinha, açúcar, ovos, chocolate.",
        price: 7.00,
        image: "/images/bolocenouraechocolate.jpg",
        category: "Lanches e Snacks"
      },
      {
        name: "Torta de Limão",
        description: "Massa de biscoito, creme de limão, chantilly, raspas de limão.",
        price: 12.00,
        image: "/images/tortadelimao.jpg",
        category: "Sobremesas"
      },
      {
        name: "Cheesecake de Frutas Vermelhas",
        description: "Base de biscoito, creme de queijo, calda de frutas vermelhas.",
        price: 15.00,
        image: "/images/cheesecake.jpg",
        category: "Sobremesas"
      },
      {
        name: "Brownie de Chocolate com Sorvete",
        description: "Chocolate meio amargo, manteiga, açúcar, farinha, ovos, sorvete de creme.",
        price: 18.00,
        image: "/images/browniecomsorvete.jpg",
        category: "Sobremesas"
      }
    ];

    // Deletar todos os produtos antes de inserir novos
    await Product.deleteMany({});

    // Adicionar os produtos ao banco
    await Product.insertMany(products);
    console.log("Produtos inseridos com sucesso!");
    process.exit();
  } catch (err) {
    console.log("Erro ao adicionar produtos:", err);
    process.exit(1);
  }
};
