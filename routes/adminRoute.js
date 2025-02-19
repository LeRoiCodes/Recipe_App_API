const express = require('express');
const {
	createUser,
	UpdateUserByAdmin,
	deleteUser,
	createRecipeByAdmin,
	getAllRecipes,
	deleteRecipe,
    updateRecipe
} = require('../controllers/adminController');
const { reviewPremiumRecipe } = require('../controllers/RecipeController');
const { authenticate, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create-user', authenticate, admin, createUser);
router.put('/update-user/:id', authenticate, admin, UpdateUserByAdmin);
router.delete('/delete-user/:id', authenticate, admin, deleteUser);
router.post('/create-recipe', authenticate, admin, createRecipeByAdmin);
router.get('/allRecipes', authenticate, admin, getAllRecipes);
router.delete('/delete-recipe/:id', authenticate, admin, deleteRecipe);
router.put('/update-recipe/:id', authenticate, admin, updateRecipe);
router.put("/:id/publish", authenticate, admin, reviewPremiumRecipe)

module.exports = router;
