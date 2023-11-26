// src/routes/category.routes.ts
import express from "express";
import * as categoryController from "../controllers/category.controller";
import { authMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.get("/", authMiddleware, categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory);
router.post("/admin/multiple", categoryController.bulkCreateCategories);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

export default router;
