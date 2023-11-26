// src/routes/index.ts
import express from "express";
import categoriesRoutes from "./category.routes";
import applicationRoutes from "./application.routes";
import organizationApplicationRoutes from "./organization-application.routes";
import syncLogRoutes from "./sync-log.routes";

const router = express.Router();

router.use("/categories", categoriesRoutes);
router.use("/applications", applicationRoutes);
router.use("/organizationApplications", organizationApplicationRoutes);
router.use("/sync-logs", syncLogRoutes);

export default router;
