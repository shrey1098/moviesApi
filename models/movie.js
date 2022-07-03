import mongoose from "mongoose";

// creat movie schema with fields id, title, release_date, runtime, and genres
const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    release_date: {
        type: Date,
        required: true
    },
    runtime: {
        type: Number,
        required: true
    },
    genres: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    }
});

const movieModel = mongoose.model("Movie", movieSchema);

export { movieModel as Movie };
