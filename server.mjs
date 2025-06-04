import express from "express";
import { conectarDB } from "./config/dbConfig.mjs";
import superHeroRoutes from "./routes/superHeroRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexion a DB
await conectarDB();

// Rutas
app.use("/api", superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req,res) => {
  res.status(400).send({mensaje: 'Ruta no encontrada'})
})

// Levantar el servidor
app.listen(PORT, () => {
  console.log("##########################");
  console.log("######## API REST ########");
  console.log("##########################");
  console.log(`http://localhost:${PORT}/`);
});
