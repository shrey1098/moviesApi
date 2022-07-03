import mongoose from "mongoose";

// model for movie ratings given by users
const movieRatingSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}
);

const movieRatingModel = mongoose.model("MovieRating", movieRatingSchema);
export { movieRatingModel as MovieRating };