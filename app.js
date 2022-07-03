//imports
import dotenv from 'dotenv';
import express, { urlencoded } from "express";
import 'dotenv/config';
import { connectDB } from "./db/connect.js";
import path from 'path';
import bodyParser from 'body-parser';
//route imports
import { authRouter } from "./routes/auth.js";
import { postRatingRouter } from './routes/rating.js';
import { movie_listsRouter } from './routes/movie_lists.js';


import passport from "passport";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import { PostData } from './moviesDB.js';

const app = express();


//middleware
app.use(morgan('tiny'))
app.use(session({secret:'cats'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())




const __dirname = path.resolve(path.dirname('')); 
app.get('/', (req, res) => {
    // render index.html
    res.sendFile(path.join(__dirname, './views/index.html'));
}
);

// routes-
app.use('/auth', authRouter);
app.use('/api/rating', postRatingRouter);
app.use('/api/movies', movie_listsRouter);


//route to post movie data from tmdb database
app.post('/postmoviedata' , async (req,res) => {
    await PostData();   // post data to database
    res.json({messaage:'data posted'})
}
)

// start server
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.t4resx7.mongodb.net/?retryWrites=true&w=majority');
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT || 5040, () => 
            console.log(`Server started on port ${process.env.PORT||5040}....`)
        );
    } catch(err){
        console.error(err);
    }
}

start();