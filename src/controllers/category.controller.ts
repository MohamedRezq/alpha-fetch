import { Request, Response } from "express";
import Category from "../models/Category";

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, slug, parent_category_id, logo, data } = req.body;
  try {
    const newCategory = await Category.create({
      name,
      slug,
      parent_category_id,
      logo,
      data,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const bulkCreateCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoriesData = req.body;
  try {
    const newCategories = await Category.bulkCreate(categoriesData);
    res.status(201).json(newCategories);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, slug, parent_category_id, logo, data } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      category.name = name;
      category.slug = slug;
      category.parent_category_id = parent_category_id;
      category.logo = logo;
      category.data = data;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("Category not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
