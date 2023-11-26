import { Request, Response } from "express";
import OrganizationApplication from "../models/OrganizationApplication";

export const getAllOrganizationApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const organizationApplications = await OrganizationApplication.findAll();
    res.status(200).json(organizationApplications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getOrganizationApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const organizationApplication = await OrganizationApplication.findByPk(id);
    if (organizationApplication) {
      res.status(200).json(organizationApplication);
    } else {
      res.status(404).send("Organization Application not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createOrganizationApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { organization_id, application_id, is_active, data } = req.body;
  try {
    const newOrganizationApplication = await OrganizationApplication.create({
      organization_id,
      application_id,
      is_active,
      data,
    });
    res.status(201).json(newOrganizationApplication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const bulkCreateOrganizationApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  const organizationApplicationsData = req.body;
  try {
    const newOrganizationApplications =
      await OrganizationApplication.bulkCreate(organizationApplicationsData);
    res.status(201).json(newOrganizationApplications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateOrganizationApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { organization_id, application_id, is_active, data } = req.body;
  try {
    const organizationApplication = await OrganizationApplication.findByPk(id);
    if (organizationApplication) {
      organizationApplication.organization_id = organization_id;
      organizationApplication.application_id = application_id;
      organizationApplication.is_active = is_active;
      organizationApplication.data = data;
      await organizationApplication.save();
      res.status(200).json(organizationApplication);
    } else {
      res.status(404).send("Organization Application not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteOrganizationApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const organizationApplication = await OrganizationApplication.findByPk(id);
    if (organizationApplication) {
      await organizationApplication.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("Organization Application not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
