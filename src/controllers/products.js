import product from "./../models/product";
import { productValid } from "../validations/productValid";

export const getAllProducts = async (req, res) => {
    try {
        const data = await product.find();

        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Product not found",
                data: [],
            })
        }

        return res.status(200).json({
            message: "Get Product successfully",
            data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            name: error.name || "Error",
        })
    }
}

export const getDelailProducts = async (req, res) => {
    try {
        const data = await product.findById(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Product is not exist!",
                data: {},
            })
        }

        return res.status(200).json({
            message: "Get Product successfully",
            data,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            name: error.name || "Error",
        })
    }
}

export const removeProductByID = async (req, res) => {
    try {
        const data = await product.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({
                message: "Delete product failed!",

            })
        }

        return res.status(200).json({
            message: "Delete product successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            name: error.name || "Error",
        })
    }
}

export const createProducts = async (req, res) => {
    try {
        const { error } = productValid.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(err => err.message);

            return res.status(404).json({
                message: errors,
            })
        }

        const data = await product.create(req.body);

        if (!data) {
            return res.status(404).json({
                message: "Create failed!",
            })
        }

        return res.status(200).json({
            message: "Create successfully!",
            data: data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            name: error.name || "Error",
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { error } = productValid.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(err => err.message);

            return res.status(404).json({
                message: errors,
            })
        }

        const data = await product.findOneAndReplace({ _id: req.params.id }, req.body, { new: true });

        if (!data) {
            return res.status(404).json({
                message: "Update failed!",
            })
        }

        return res.status(200).json({
            message: "Update successfully!",
            data: data,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server Error",
            name: error.name || "Error",
        })
    }
}