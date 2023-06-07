const express = require ("express")
const z = require("zod")
const { getAllRecipes, saveRecipe, updateRecipe, deleteRecipe } = require("../database/recipe")

const router = express.Router()

const recipeSchema = z.object({
  nome: z.string(),
  descricao: z.string(),
  tempoPreparo: z.string()
  
})

router.get("/recipe", auth, async (req,res) =>{
  try {
    const recipe = await getAllRecipes(req.userId);
    res.json(recipe);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    } 
  }
 });

router.post("/recipe", async (req,res) =>{
  try {
    const recipe = recipeSchema.parse(req.body); 
        const userId = req.userId;
        const savedRecipe = await saveRecipe(recipe, userId);
        res.status(201).json({
          recipe: savedRecipe, 
      });
  } catch(error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }  res.status(500).json({
      message: "Servidor em erro!",
    });
  }
} )

router.put("/recipe/:id", async(req,res) =>{
  try{
    const id = Number(req.params.id); 
    const recipe = recipeSchema.parse(req.body);
    const updatedRecipe = await updateRecipe(id, recipe); 
    res.json({
        post: updatedRecipe, 
    });
  }catch(error){
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }  res.status(500).json({
      message: "Servidor em erro!",
    });
  }

} )

router.delete("/recipe/:id", async(req,res) =>{
  try{
    const id = Number(req.params.id);
    await deletePosts(id); 
    res.status(204).send();
  }catch(error) {
    if (error instanceof z.ZodError) {
      return res.status(422).json({
        message: error.errors,
      });
    }  res.status(500).json({
      message: "Servidor em erro!",
    });
  }
} )

module.exports = router