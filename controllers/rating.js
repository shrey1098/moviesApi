import { User } from "../models/user.js";
import { Movie } from "../models/movie.js";
import { MovieRating } from "../models/movie_rating.js";



// post a rating for a movie by a user
const postRating = async (res, movieId, userId, rating) => {
    // check if usaerId is valid
    const user = await User.findOne({googleId: userId});
    if (!user) {
        res.status(400).json({message:"User not found"});
    }
    // check if movieId is valid
    const movie = await Movie.findOne({id:movieId});
    if (!movie) {
        res.status(400).json({message:"Movie not found"});
    }
    // check if rating is valid
    if (rating < 1 || rating > 5) {
        res.status(400).json("Rating must be between 1 and 5");
    }
    // check if user has already rated the movie
    const movieRating = await MovieRating.findOne({
        googleId: userId,
        movieId: movieId
    });
    if (movieRating) {
        // update rating
        movieRating.rating = rating;
        await movieRating.save();
        res.status(200).json({ message: "Rating updated"});
    }
    // create a new movie rating
    else{
    const newMovieRating = new MovieRating({
        googleId: userId,
        movieId: movieId,
        rating: rating
    });
    // save the movie rating
    await newMovieRating.save();
    res.status(200).json({ message: "Rating saved"});
}
}

const getAverageRating = async (res, movieId) => {
    // get all movie ratings for a movie
    const movieRatings = await MovieRating.find({movieId: movieId});
    const movie = await Movie.findOne({id: movieId});
    //if movie does not exist, return error
    if (!movie) {
        res.status(400).json({message:"Movie not found"});
    }
    
    else{
        // if no ratings
        if (movieRatings.length === 0) {
            res.status(200).json({message: "No ratings"});
        }
        // calculate average rating
        else{
            let sum = 0;
            for (let i = 0; i < movieRatings.length; i++) {
                sum += movieRatings[i].rating;
            }
            const averageRating = sum / movieRatings.length;
            res.status(200).json({Title: movie.title, averageRating: averageRating});
        }
    }
}
export { postRating,getAverageRating };