import foodModel from "../models/foodModel.js";
import fs from "fs";

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

        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

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

// FIX: assign food_1.png ... food_32.png to existing DB items
const updateFoodImages = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        if (!foods.length) {
            return res.json({ success: false, message: "No food items found in database" });
        }

        for (let i = 0; i < foods.length; i++) {
            const imageNumber = (i % 32) + 1; // food_1.png to food_32.png
            await foodModel.findByIdAndUpdate(foods[i]._id, {
                image: `food_${imageNumber}.png`
            });
        }

        res.json({
            success: true,
            message: `Updated ${foods.length} food images to food_1.png ... food_32.png`
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food images" });
    }
};

export { addFood, listFood, removeFood, updateFoodImages };