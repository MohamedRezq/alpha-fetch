// src/routes/organizationApplication.routes.ts
import express from "express";
import * as organizationApplicationController from "../controllers/organization-application.controller";
import { authMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.get(
  "/",
  organizationApplicationController.getAllOrganizationApplications
);
router.get(
  "/:id",
  organizationApplicationController.getOrganizationApplicationById
);
router.post(
  "/",
  organizationApplicationController.createOrganizationApplication
);
router.post(
  "/admin/multiple",
  organizationApplicationController.bulkCreateOrganizationApplications
);
router.put(
  "/:id",
  organizationApplicationController.updateOrganizationApplication
);
router.delete(
  "/:id",
  organizationApplicationController.deleteOrganizationApplication
);

export default router;
