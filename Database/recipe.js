const prisma = require("../database/prisma");  


const getAllRecipes = (userId) => {  
  return prisma.recipe.findMany({
    where: {
      userId
    }
  });
}

const saveRecipe = ({ nome, descricao, tempoPreparo, userId }) => {  
  
  return prisma.recipe.create({
    data: {
      nome: posts.nome,
      descricao: posts.descricao,
      tempoPreparo: posts.tempoPreparo,
      usuario: { 
          connect: {
              id: userId,
          }
      }
  }
  });
}

const updateRecipe = (id, recipe) => {  

  return prisma.recipe.update({
    where: { 
      id: id 
    },
    data: recipe,
  });
};

const deleteRecipe = (id) => { 
  return prisma.recipe.delete({
    where: { 
      id: id
    }
  })
}

module.exports = {  
  getAllRecipes,
  saveRecipe,
  updateRecipe,
  deleteRecipe,
}