import mongoose from "mongoose";
import { Movie } from "./models/movie.js";
import fetch from "node-fetch";

const getData = (id) => {
    // get data from a remote API
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=cbd5e9c5e8b8837899edf4990b7acfd7`)
        .then(response => response.json())
        .then(data => {
            return data;
        }
        ).catch(err => {
            console.log(err);
        }
        );
}

// to post movie data from tmdb api to db
const PostData = () => {
    // array of movie ids
    var movieIds=[]
    for (let i = 1; i < 53000; i++) {
        movieIds.push(i);
    }
    console.log(movieIds)
    // post data retrived from getData to a Movie model in the database
    movieIds.forEach(id => {
        getData(id).then(data => {
            console.log(id)
            if(data.id === undefined){
                console.log('movie not found')
                
            }
            else{
                if (data.genres.length === 0) {
                    
                    console.log('no genres')
                    var genres = "no genres"
                }
                else {
                    var genres = data.genres[0].name
                }
                const movie = new Movie({
                    id: data.id || id,
                    title: data.title,
                    release_date: data.release_date,
                    runtime: data.runtime,
                    genres: genres,
                    overview: data.overview || "No overview available",
                });
                movie.save();
        }
        }
        );
    }
    );
    console.log('data posted')
}
export { PostData as PostData };
