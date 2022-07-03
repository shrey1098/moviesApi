import express from "express";
import { verifyToken } from "../middlewres/verifyToken.js";
import { postRating, getAverageRating } from "../controllers/rating.js";

const router = express.Router();

// api end point to post rating for a movie
// usage : /api/rating/post/:movieId/:rating?apiToken=
router.post("/post/:movieId/:rating", verifyToken, (req, res) => {
    const { movieId, rating } = req.params;
    const googleId = res.locals.googleId;
    postRating(res, movieId, googleId, rating)
}
);

// open api end point to get average rating for a movie
router.get("/averageRating/:movieId", (req, res) => {
    const { movieId } = req.params;
    getAverageRating(res, movieId)
}
);

export { router as postRatingRouter };