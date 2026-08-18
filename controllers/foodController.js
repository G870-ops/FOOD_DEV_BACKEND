import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add Food Item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food" });
    }
};

// All Food List
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching food list" });
    }
};

// Remove Food Item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        // 👈 Check if food item exists in database
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // 👈 Fixed typo (fs.unlink) and used backticks ``
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log("File deletion error:", err);
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food" });
    }
};

export { addFood, listFood, removeFood };