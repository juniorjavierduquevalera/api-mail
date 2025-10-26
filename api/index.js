import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mailRoutes from "./routes/mail.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mail", mailRoutes); 

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});













