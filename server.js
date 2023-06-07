const express = require('express'); 
const userRoutes = require("./routes/users"); 
const recipeRoutes = require("./routes/recipe"); 

const server = express(); 

server.use(express.json()); 

server.use(userRoutes); 
server.use(recipeRoutes);

module.exports = server; 