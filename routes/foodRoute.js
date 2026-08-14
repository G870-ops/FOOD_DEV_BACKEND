import express from "express";
import { addFood, listFood, removeFood, updateFoodImages } from "../controllers/foodController.js";
import multer from "multer";
import fs from "fs";

const foodRouter = express.Router();

const uploadDir = process.env.VERCEL ? "/tmp" : "uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

// one-time fix route
foodRouter.get("/update-images", updateFoodImages);

export default foodRouter;