const express = require('express');
const router = express.Router();

//this route is for api documentation using swaggerui

/**
 * @swagger
 * components:
 *     securitySchemes:
 *         bearerAuth:
 *             type: http
 *             scheme: bearer
 *             bearerFormat: JWT
 *     schemas:
 *         Admin:
 *             type: object
 *             required:
 *                 - fullname
 *                 - username
 *                 - email
 *                 - password
 *                 - createdAt
 *                 - updatedAt
 *             properties:
 *                 fullname:
 *                      type: string
 *                      description: The full name of the user
 *                 username:
 *                      type: string
 *                      description: The username email of the user
 *                 email:
 *                      type: string
 *                      description: The email of the user
 *                 password:
 *                      type: string
 *                      description: The encrypted password of the user
 *             example:
 *                 fullname: June Doe
 *                 username: JuneDoe
 *                 email: junedoe@ymail.com
 *                 password: kdfjd495ubfik49b5ifb3obfo3kf
 *
 *         User:
 *             type: object
 *             required:
 *                 - fullname
 *                 - username
 *                 - email
 *                 - password
 *                 - createdAt
 *                 - updatedAt
 *             properties:
 *                 fullname:
 *                      type: string
 *                      description: The full name of the user
 *                 username:
 *                      type: string
 *                      description: The username email of the user
 *                 email:
 *                      type: string
 *                      description: The email of the user
 *                 password:
 *                      type: string
 *                      description: The encrypted password of the user
 *             example:
 *                 fullname: June Doe
 *                 username: JuneDoe
 *                 email: junedoe@ymail.com
 *                 password: kdfjd495ubfik49b5ifb3obfo3kf
 *
 *         Recipe:
 *             type: object
 *             required:
 *                 - _id
 *                 - title
 *                 - image
 *                 - description
 *                 - utensils
 *                 - author
 *                 - ispublished
 *                 - ingredients
 *                 - steps
 *                 - templateId
 *             properties:
 *                 _id:
 *                      type: string
 *                      description: The auto generated id of the recipe
 *                 title:
 *                      type: string
 *                      description: The title of recipe
 *                 image:
 *                      type: string
 *                      description: The url of the image
 *                 description:
 *                      type: string
 *                      description: The description of the recipe
 *                 utensils:
 *                      type: array
 *                      description: List of all utensils needed
 *                 author:
 *                      type: string
 *                      description: The user who created recipe
 *                 ispublished:
 *                      type: boolean
 *                      description: Checks whether recipe is published
 *                 ingredients:
 *                      type: array
 *                      description: The ingredients needed for recipe
 *                 steps:
 *                      type: array
 *                      description: The steps to cook the recipe
 *                 votes:
 *                      type: array
 *                      description: All the votes for the recipe
 *             example:
 *                 _id: Jkfgn84bkfi4nfion2n9
 *                 title: Water fufu and Eru
 *                 image: https://gjhfdso.com/sdfhf.jpeg
 *                 description: The best meal ever
 *                 utensils: [bowl, pots, cooking spoon]
 *                 author: June Doe
 *                 templateId: 1000
 *                 ispublished: false
 *                 email: [water leaves, cow meat, eru leaves, canda meat, dry fish, water fufu, red oil ]
 *                 steps: [{step: 1, text: boil the meat}, {step: 2, text: wash the water leaves and eru leaves}]
 *                 votes: [y,y,y,y,y,y,y,y,y,y,y,y,y,y,y,y,y,y]
 *
 *
 *     response:
 *         Recipe:
 *             type: object
 *             required:
 *                 - title
 *                 - image
 *                 - description
 *                 - utensils
 *                 - ispublished
 *                 - ingredients
 *                 - steps
 *                 - templateId
 *             properties:
 *                 title:
 *                      type: string
 *                      description: The title of recipe
 *                 image:
 *                      type: string
 *                      description: The url of the image
 *                 description:
 *                      type: string
 *                      description: The description of the recipe
 *                 utensils:
 *                      type: array
 *                      description: List of all utensils needed
 *                 ispublished:
 *                      type: boolean
 *                      description: Checks whether recipe is published
 *                 ingredients:
 *                      type: array
 *                      description: The ingredients needed for recipe
 *                 steps:
 *                      type: array
 *                      description: The steps to cook the recipe
 *         Error:
 *             type: object
 *             properties:
 *                 message:
 *                      type: string
 */

/**
 * @swagger
 * tags:
 *     - name: users
 *       description: The User managing api
 *     - name: recipes
 *       description: The recipe managing api
 *     - name: Admins
 *       description: Routes for Admin functionalities
 */

/**
 * @swagger
 * /api/v1/user/register:
 *     post:
 *         summary: user creates account
 *         tags:
 *             - users
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/User'
 *         responses:
 *             '201':
 *                description: Created user successfully
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: User already exist
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '404':
 *                 description: Please provide all details
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/response/Error'
 * /api/v1/user/confirm/{confirmationCode}:
 *      get:
 *         summary: Verify user account
 *         tags:
 *             - users
 *         parameters:
 *             - in: path
 *               name: confirmationCode
 *               schema:
 *                    type: string
 *                    required: true
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                    type: boolean
 *                                    description: success bolean.
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: Invalid Token
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/user/login:
 *     post:
 *         summary: logs user in
 *         tags:
 *             - users
 *         requestBody:
 *             description: a json with email and password
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: The email of the user
 *                              password:
 *                                  type: string
 *                                  description: The encrypted password of the user
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                    type: boolean
 *                                    description: success bolean.
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *                                access_token:
 *                                     type: string
 *                                     description: access_token
 *             '401':
 *                 description: Invalid credentials
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '404':
 *                 description: Please provide an email and password
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/response/Error'
 *
 * /api/v1/user/me:
 *     get:
 *         summary: gets the authenticated user info
 *         security:
 *             - bearerAuth: []
 *         tags:
 *             - users
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            #ref: '#/components/schemas/User
 *             '401':
 *                 description: Not authorized
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 *     patch:
 *         summary: update the authenticated user info
 *         security:
 *             - bearerAuth: []
 *         tags:
 *             - users
 *         requestBody:
 *             description: a json with email and password
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: The email of the user
 *                              password:
 *                                  type: string
 *                                  description: The encrypted password of the user
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            #ref: '#/components/schemas/User
 *             '404':
 *                 description: User not found
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 * /api/v1/user/forgotpassword:
 *      post:
 *         summary: forgot password reset
 *         tags:
 *             - users
 *         requestBody:
 *             description: a json with email
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          type: object
 *                          required:
 *                              - email
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: The email of the user
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                    type: boolean
 *                                    description: success bolean.
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '404':
 *                 description: User does not exist
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '500':
 *                 description: Internal server error
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/response/Error'
 *
 * /api/v1/user/resetpassword/{resettoken}:
 *      put:
 *         summary: forgot password reset
 *         tags:
 *             - users
 *         parameters:
 *             - in: path
 *               name: resettoken
 *               schema:
 *                    type: string
 *                    required: true
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                success:
 *                                    type: boolean
 *                                    description: success bolean.
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: Invalid Token
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 */

/**
 * @swagger
 * /api/v1/recipe:
 *     post:
 *         summary: Creating Recipe by authenticated user
 *         tags:
 *             - recipes
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          $ref: '#/components/response/Recipe'
 *         responses:
 *             '201':
 *                description: Created recipe successfully
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Recipe'
 *             '500':
 *                 description: Something went horribly wrong
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *     get:
 *         summary: gets a published list of all recipes
 *         tags:
 *             - recipes
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            #ref: '#/components/schemas/Recipe
 *             '404':
 *                 description: No recipies found
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 * /api/v1/recipe/{id}:
 *     get:
 *         summary: finds a recipe by id
 *         tags:
 *             - recipes
 *         parameters:
 *             - in: path
 *               name: id
 *               required: true
 *         schema:
 *           AnyValue: {}
 *         responses:
 *             '200':
 *                 description: Success
 *                 content:
 *                     application/json:
 *                         schema:
 *                             #ref: '#/components/schemas/Recipe
 *             '404':
 *                 description: No recipe found with id
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *     put:
 *         summary: authenticated user updates recipe
 *         tags:
 *             - recipes
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               required: true
 *         schema:
 *           type: string
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          $ref: '#/components/response/Recipe'
 *         responses:
 *             '200':
 *                description: success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: Recipe not found
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '401':
 *                 description: user not authorized
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/response/Error'
 *
 *     delete:
 *         summary: Authenticated user Deletes a recipe by id
 *         tags:
 *             - recipes
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id   # Note the name is the same as in the path
 *               required: true
 *         schema:
 *           type: string
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: No recipe found with id
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '401':
 *                 description: User is not authorized
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 * /api/v1/recipe/{id}/publish:
 *     patch:
 *         summary: finds a recipe by id and publishes it
 *         tags:
 *             - recipes
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               required: true
 *         schema:
 *           type: string
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                isPublished:
 *                                    type: boolean
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: No recipe found with id
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 *             '401':
 *                 description: User not authorized
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/recipe/myrecipe:
 *     get:
 *         summary: Get all recipe for a specify user (authenticated)
 *         tags:
 *             - recipes
 *         security:
 *             - bearerAuth: []
 *
 *         schema:
 *           type: string
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                isPublished:
 *                                    type: boolean
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: No recipe found with id
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 *             '401':
 *                 description: User not authorized
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/recipe/highest-vote:
 *     get:
 *         summary: Get Highest voted recipes
 *         tags:
 *             - recipes
 *         security:
 *             - bearerAuth: []
 *
 *         schema:
 *           type: string
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                isPublished:
 *                                    type: boolean
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: No recipe found with id
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 *             '401':
 *                 description: User not authorized
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 * /api/v1/recipe/{id}/vote:
 *     patch:
 *         summary: finds a recipe by id and vote for it
 *         tags:
 *             - recipes
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               required: true
 *         schema:
 *           type: string
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Recipe'
 *             '400':
 *                 description: No recipe found with id
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 *             '401':
 *                 description: User not authorized
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/recipe/category/{category}:
 *     get:
 *         summary: gets a list of all recipes that belong to a category
 *         tags:
 *             - recipes
 *         parameters:
 *             - in: path
 *               name: category 
 *               required: true
 *         schema:
 *           type: string
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            #ref: '#/components/schemas/Recipe
 *             '404':
 *                 description: No recipies found
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 */

/**
 * @swagger
 * /api/v1/admin/create-user:
 *     post:
 *         summary: Create a user account by admins
 *         tags:
 *             - Admins
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                          $ref: '#/components/schemas/Admin'
 *         responses:
 *             '201':
 *                description: Created user successfully
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: User already exist
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *    
 * /api/v1/admin/update-user/{id}:
 *     put:
 *         summary: Update User and can also make user an admin
 *         tags:
 *             - Admins
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               required: true
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                     schema: {
 *                         type: object,
 *                         example: {
 *                              fullname: John Doe,
 *                              username: JDoe,
 *                              isAdmin: true
 *                            }
 *                      }
 *         responses:
 *             '201':
 *                description: Created user successfully
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: User already exist
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/admin/delete-user/{id}:
 *     delete:
 *         summary: Update User and can also make user an admin
 *         tags:
 *             - Admins
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               required: true
 *         responses:
 *             '201':
 *                description: User removed
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: User already exist
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/admin/create-recipe:
 *     post:
 *         summary: Creating Recipe by an admin
 *         tags:
 *             - Admins
 *         security:
 *             - bearerAuth: []
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                     schema: {
 *                         type: object,
 *                         example: {
 *                              title: "Ghana Jollof",
			images: [],
			description: "Learn how to cook Ghnan Jollof rice ",
			utensils,
			ingredients:  [
        {
            "id": 0,
            "value": "2 boneless skinless chicken breasts"
        },
        {
            "id": 1,
            "value": "Kosher salt"
        },
        {
            "id": 2,
            "value": "Extra-virgin olive oil"
        }
    ],
			steps: [
                 
        {
            "id": 1,
            "value": "In a blender, combine tomatoes, red peppers, chopped onions and scotch bonnets with 2 cups of stock, blend till smooth for 2 minutes and pour into a large pot/pan and boil for 10-12 minutes."
        },
        {
            "id": 2,
            "value": "In a large pan, heat oil and add sliced onions. Season with salt and stir fry for 2-3 minutes on medium heat then add the tomatoe paste and stir fry for two minutes heat. Add thetomato pepper mixyure and set on medium heat for 10-12 minutes."
        }
            ],
			status: "free",
			price,
			coverImage: "",
			preparationTime: "60 mins",
			yield: "",
			difficulty: "easy",
			templateId: 100,
 *                            }
 *                      }
 *         responses:
 *             '201':
 *                description: Created recipe successfully
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Recipe'
 *             '500':
 *                 description: Something went  wrong
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/admin/allRecipes:
 *     get:
 *         summary: finds a recipe by id in the database
 *         security:
 *             - bearerAuth: []
 *         tags:
 *             - Admins
 *         schema:
 *           AnyValue: {}
 *         responses:
 *             '200':
 *                 description: Success
 *                 content:
 *                     application/json:
 *                         schema:
 *                             #ref: '#/components/schemas/Recipe
 *             '404':
 *                 description: No recipe found with id
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/admin/delete-recipe/{id}:
 *     delete:
 *         summary: Update User and can also make user an admin
 *         tags:
 *             - Admins
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               required: true
 *         responses:
 *             '201':
 *                description: Recipe Deleted Successfully
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: User already exist
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * /api/v1/admin/update-recipe/{id}:
 *       put:
 *         summary: Update Recipe
 *         tags:
 *             - Admins
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id
 *               required: true
 *         schema:
 *           type: string
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                      schema: {
 *                         type: object,
 *                         example: {
 *                              title: "Ghana Jollof",
			images: [],
			description: "Learn how to cook Ghnan Jollof rice ",
			utensils,
			ingredients:  [
        {
            "id": 0,
            "value": "2 boneless skinless chicken breasts"
        },
        {
            "id": 1,
            "value": "Kosher salt"
        },
        {
            "id": 2,
            "value": "Extra-virgin olive oil"
        }
    ],
			steps: [
                 
        {
            "id": 1,
            "value": "In a blender, combine tomatoes, red peppers, chopped onions and scotch bonnets with 2 cups of stock, blend till smooth for 2 minutes and pour into a large pot/pan and boil for 10-12 minutes."
        },
        {
            "id": 2,
            "value": "In a large pan, heat oil and add sliced onions. Season with salt and stir fry for 2-3 minutes on medium heat then add the tomatoe paste and stir fry for two minutes heat. Add thetomato pepper mixyure and set on medium heat for 10-12 minutes."
        }
            ],
			status: "free",
			price,
			coverImage: "",
			preparationTime: "60 mins",
			yield: "",
			difficulty: "easy",
			templateId: 100,
 *                            }
 *                      }
 *         responses:
 *             '200':
 *                description: success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: Recipe not found
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *             '401':
 *                 description: user not authorized
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/response/Error'
 * 
 *  /api/v1/admin/{id}/publish:
 *     patch:
 *         summary: finds a premium recipe by id and publishes it
 *         tags:
 *             - recipes
 *         security:
 *             - bearerAuth: []
 *         parameters:
 *             - in: path
 *               name: id  
 *               required: true
 *         schema:
 *           type: string
 *         responses:
 *             '200':
 *                description: Success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                isPublished:
 *                                    type: boolean
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *             '400':
 *                 description: No recipe found with id
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 * 
 *             '401':
 *                 description: User not authorized
 *                 content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/components/response/Error'
 *
 *
 */

module.exports = router;
