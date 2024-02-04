const express = require("express");
const router = express();
const upload = require('../middleware/uploadImages')
const {MovieController}= require('../controllers/movie_controller')

router.get('/', MovieController.getAllMovies)
router.post('/add',upload.single("image"),MovieController.createMovie)
router.delete('/:id', MovieController.deleteMovie)
router.get('/:id', MovieController.getOneMovie)
router.put('/:id',upload.single("image"), MovieController.updateMovie)

module.exports= router