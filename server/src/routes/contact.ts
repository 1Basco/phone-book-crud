import { Router } from "express";
import { contactController } from "../controllers/contacts";

const contactRouter = Router();
contactRouter.get("/", contactController.listContacts);
contactRouter.get("/:id", contactController.getContact);
contactRouter.post("/", contactController.insertContact);
contactRouter.put("/:id", contactController.updateContact);
contactRouter.delete("/:id", contactController.deleteContact);

export { contactRouter };
