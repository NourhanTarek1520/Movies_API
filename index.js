// ==================== INITIALIZE EXPRESS APP ====================
const express = require("express");
const app = express();

// ====================  GLOBAL MIDDLEWARE ====================
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TO ACCESS URL FORM ENCODED
app.use(express.static("upload"));
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS LOCAL HOSTS

// ====================  Required Module ====================

const movie_router = require('./routes/movies_routers')

// ====================  API ROUTES [ ENDPOINTS ]  ====================

app.use('/movie',movie_router)

// ====================  RUN THE APP  ====================
app.listen(3000, () => {
  console.log("SERVER IS RUNNING ");
});
