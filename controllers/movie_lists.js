import { Movie } from '../models/movie.js';


const randomlist = async (req, res) => {
    // get a random list of movies of a certain length given by user
    const {length} = req.params;
    const movies = await Movie.aggregate([
        { $sample: { size: parseInt(length) } }
    ]);
    res.status(200).json(movies);
}

const search = async (req, res) => {
    // check if user has provided title or genre or runtime
    const {title, genre, limit} = req.query;
    // if user has provided limit, then use it else use default limit as 10
    let limitNum = limit ? parseInt(limit) : 10;
    let movies = [];
    // query db for movies with title or genre or both
    if(title && genre){
        movies = await Movie.find
        ({$and:
            [{title: {$regex: title, $options: 'i'}},
             {genres: {$regex: genre, $options: 'i'}}]}
             ).limit(limitNum);
    }
    if(title && !genre){
        movies = await Movie.find
        ({title: {$regex: title, $options: 'i'}}).limit(limitNum);
    }
    if(!title && genre){
        movies = await Movie.find
        ({genres: {$regex: genre, $options: 'i'}}).limit(limitNum);
    }
    if (movies.length === 0){
        res.status(200).json({message:'no movies found'})
    }
    else{
    res.status(200).json(movies);}
}


const getmovie = async (req, res) => {
    // check if user has provided title or id
    const {title, id} = req.query;
    let movie;
    // query db for movie with title or id
    if(title){
        movie = await Movie.findOne({title: title});
        check()
    }
    if(id){
        movie = await Movie.findOne({id: id});
        check()
    }
    function check () {
        if(movie){
            res.status(200).json(movie)
        }
        else{
            res.status(200).json({message:'no movie found'})
        }
    }

}
export {randomlist, search, getmovie};

