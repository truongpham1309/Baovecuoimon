import { Router } from "express";
import { createProducts, getAllProducts, getDelailProducts, removeProductByID, updateProduct } from "../controllers/products";
import { checkPermission } from "../middlewares/checkPermission";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getDelailProducts);
productRouter.post("/",checkPermission, createProducts);
productRouter.put("/:id",checkPermission, updateProduct);
productRouter.delete("/:id",checkPermission, removeProductByID);

export default productRouter;