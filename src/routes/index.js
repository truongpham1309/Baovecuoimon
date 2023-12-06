import { Router } from "express";
import productRouter from "./productsRouter";
import authRouter from "./authRouter";

const router = Router();

router.use("/products", productRouter);
router.use("/auth", authRouter);

// Thêm các route vào đây

export default router;
