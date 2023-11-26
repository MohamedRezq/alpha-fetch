// src/routes/syncLog.routes.ts
import express from "express";
import * as syncLogController from "../controllers/sync-log.controller";
import { authMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.get("/", authMiddleware, syncLogController.getAllSyncLogs);
router.get("/:id", syncLogController.getSyncLogById);
router.post("/", syncLogController.createSyncLog);
router.post("/admin/multiple", syncLogController.bulkCreateSyncLogs);
router.put("/:id", syncLogController.updateSyncLog);
router.delete("/:id", syncLogController.deleteSyncLog);

export default router;
