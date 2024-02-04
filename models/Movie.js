const util = require('util')
const { connection } = require('../db/dbConnection')
class Movie {
    constructor(id, name, description, image_url) {
        this.name = name,
            this.description = description,
            this.image_url = image_url,
            this.id = id;
    }
    getName() { return this.name }
    getDescription() { return this.description }
    getImageUrl() { return this.image_url }
    getId() { return this.id }

    setName(name) { this.name = name }
    setDescription(description) { this.description = description }
    setImageUrl(image_url) { this.image_url = image_url }
    setId(id) { this.id = id }

    static query = util.promisify(connection.query).bind(connection);

    static async getAll() {
        try {
            const result = await this.query('select * from movies');
            if (result.length === 0) return []
            else return result
        } catch (error) { console.log(error) }
    }
    static async get(id) {
        try {
            const result = await this.query('select name , description ,image_url from movies where id = ? ', [id])
            if (result == null) return [];
            else return result;

        } catch (error) { console.log(error) }

    }
    static async addNew(movie) {
        try {
            const result = await this.query('insert into movies set  ?', [movie])
            if (result.affectedRows == 1) return true
            else return false
        } catch (error) { console.log(error) }
    }
    static async delete(id) {
        try {
            const result = await this.query(`DELETE FROM movies WHERE  id = ${id};`)
            if (result.affectedRows === 1) return true
            else return false
        } catch (error) { console.log(error) }

    }
    static async update(movie) {
        try {
           
            const result = await this.query('update  movies set name = ? , description = ? , image_url =? where id =? ', [movie.name, movie.description, movie.image_url, movie.id])
            
            if (result.affectedRows === 1) return true
            else return false
        } catch (error) { console.log(error) }
    }
    static async isIdExsist(id) {
        const result = await this.query("select * from movies where id =?", [id])
        if (result.length === 0) return false
        else return true
    }

}
module.exports = { Movie }