import express from "express";
import { useRoutes } from "./routes";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

useRoutes(app);
