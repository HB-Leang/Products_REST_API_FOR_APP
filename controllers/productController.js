import { validationResult } from "express-validator";

const product = await import("../models/productModel.js");

export const getProducts = async (req, res) => {
  try {
    const data = await product.getAllProducts();
    res
      .status(200)
      .json({ message: "Products retrieved successfully", data: data });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const getProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    console.log(id);
    const data = await product.getProductById(id);
    
    if (data.length === 0) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res
      .status(200)
      .json({ message: "Product retrieved successfully", data: data });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prodcuct" });
  }
};

export const createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const isProductCreated = await product.createProduct(req.body);

    if (!isProductCreated) {
      return res
        .status(400)
        .json({
          message: "Failed to create product",
          errors: "Database error",
        });
    }

    res.status(200).json({ message: "Product created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prodcuct" });
  }
};

export const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;

    if (!(await product.isProductExist(id))) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const isProductUpdated = await product.updateProduct(id, req.body);

    if (!isProductUpdated) {
      return res.status(400).json({ message: "Failed to update product" });
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;

    if (!(await product.isProductExist(id))) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    const isProductDeleted = product.deleteProduct(id);

    if (!isProductDeleted) {
      return res.status(400).json({ message: "Failed to delete product" });
    }

    res.status(200).json({ message: "Product delete successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
