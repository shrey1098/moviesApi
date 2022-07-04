import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { postRating, getAverageRating } from "../controllers/rating.js";

const router = express.Router();

// api end point to post rating for a movie
// usage : /api/rating/post/:movieId/:rating?apiToken=
router.post("/post/:movieId/:rating", verifyToken, (req, res) => {
    postRating(req, res)
}
);

// open api end point to get average rating for a movie
router.get("/averageRating/:movieId", (req, res) => {
    getAverageRating(req, res)
}
);

export { router as postRatingRouter };