import express from "express";
import { useRoutes } from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

useRoutes(app);