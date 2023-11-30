// src/routes/integrate.routes.ts
import express from "express";
import * as integrateController from "../controllers/integrate.controller";
import { authMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.post("/", integrateController.integrateData);

export default router;
