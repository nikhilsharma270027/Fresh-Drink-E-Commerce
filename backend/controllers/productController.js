import Product from '../Schemas/Product.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAllCan = async (req, res) => {
  try {
    const products = await Product.find({type: "can"});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAllCookie = async (req, res) => {
  try {
    const products = await Product.find({type: "cookie"});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
