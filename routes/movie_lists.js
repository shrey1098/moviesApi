import express from 'express';
import { verifyToken } from '../middlewres/verifyToken.js';
import { randomlist, search, getmovie } from '../controllers/movie_lists.js';


const router = express.Router();

// get a random list of movies of a certain length given by user
// usage: /api/movies/randomlist/:length&apiToken=
router.get("/randomlist/:length", verifyToken, (req, res) => {
    randomlist(req, res)
}
);

// api end point to search for movies with title or genre or both
// usage : /api/movies/search?title=&genre=&limit=&apiToken=
// default limit is 10
router.get("/search", verifyToken, (req, res) => {
    // check if user has provided title or genre
    search(req, res)
}
);


// api end point to get movie id from title or vice versa
// usage : /api/movies/getmovie?title=&id=&apiToken=
router.get("/getmovie", verifyToken, (req, res) => {
    getmovie(req, res)
}
);

export{router as movie_listsRouter};