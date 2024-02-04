const { Movie } = require('../models/Movie')
const fs = require("fs"); // file system
class MovieController {
    
    static getAllMovies = async (req, res, next) => {
        try {
            const movies = await Movie.getAll();
            if(movies.length === 0){  res.status(404).json("No Movies");}
            else res.status(200).json(movies);
        } catch (error) {

            console.error(error);

            res.status(500).json({ message: 'Internal server error' });
        }

    }
    static getOneMovie = async (req, res, next) => {
        try {
            if (await Movie.isIdExsist(req.params.id) === true) {
                const result = await Movie.get(req.params.id)
                if (result.length == 0) res.status(400).json("no data")
                else res.status(200).json(result)
            }
            else res.status(404).json("This id is not exsist ")
        } catch (error) {
            res.status(500).json('Erorr :' + error)
        }
    }
    static createMovie = async (req, res, next) => {

        const movieObj = new Movie();
        movieObj.setName(req.body.name);
        movieObj.setDescription(req.body.description)
        movieObj.setImageUrl(req.file.filename)

        const result = await Movie.addNew(movieObj);
        if (result == true) res.status(200).json('movie is inserted succesfully')
        else  res.status(500).json(err);

    }
    static updateMovie = async (req, res, next) => {
        if (await Movie.isIdExsist(req.params.id) == true) {
            const movieObj = new Movie();
            movieObj.setName(req.body.name);
            movieObj.setDescription(req.body.description)
            movieObj.setId(req.params.id)
        
        // delete the old image 
        // const movie = await Movie.get(req.params.id)
        // if (req.file) {
        //     movieObj.setImageUrl(req.file.filename) ;
        //     fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image
        // }
        const result = await Movie.update(movieObj)
            if (result == true) res.status(200).json('movie is updated')
            else  res.status(500).json(err);
        }
        else res.status(404).json("This id is not exsist ")


    }
    static deleteMovie = async (req, res, next) => {
        if (await Movie.isIdExsist(req.params.id) === true) {
            const movie = await Movie.get(req.params.id)
            fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image
            const result = await Movie.delete(req.params.id);
            if (result == true) {
                res.status(200).json('movie delete successfully');
            }
            else  res.status(500).json(err);
        }
        else res.status(404).json("This id is not exsist ")



    }

}
module.exports = { MovieController }