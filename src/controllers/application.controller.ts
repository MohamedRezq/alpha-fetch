import { Request, Response } from "express";
import Application from "../models/Application";

export const getAllApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const applications = await Application.findAll();
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getApplicationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const application = await Application.findByPk(id);
    if (application) {
      res.status(200).json(application);
    } else {
      res.status(404).send("Application not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, slug, description, logo, is_integrated, category_id, data } =
    req.body;
  try {
    const newApplication = await Application.create({
      name,
      slug,
      description,
      logo,
      is_integrated,
      category_id,
      data,
    });
    res.status(201).json(newApplication);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const bulkCreateApplications = async (
  req: Request,
  res: Response
): Promise<void> => {
  const applicationsData = req.body;
  try {
    const newApplications = await Application.bulkCreate(applicationsData);
    res.status(201).json(newApplications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, slug, description, logo, is_integrated, category_id, data } =
    req.body;
  try {
    const application = await Application.findByPk(id);
    if (application) {
      application.name = name;
      application.slug = slug;
      application.description = description;
      application.logo = logo;
      application.is_integrated = is_integrated;
      application.category_id = category_id;
      application.data = data;
      await application.save();
      res.status(200).json(application);
    } else {
      res.status(404).send("Application not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteApplication = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const application = await Application.findByPk(id);
    if (application) {
      await application.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("Application not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
