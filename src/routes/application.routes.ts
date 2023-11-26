// src/routes/application.routes.ts
import express from "express";
import * as applicationController from "../controllers/application.controller";
import { authMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.get("/", authMiddleware, applicationController.getAllApplications);
router.get("/:id", applicationController.getApplicationById);
router.post("/", applicationController.createApplication);
router.post("/admin/multiple", applicationController.bulkCreateApplications);
router.put("/:id", applicationController.updateApplication);
router.delete("/:id", applicationController.deleteApplication);

export default router;
