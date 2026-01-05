import express from "express";
import { registerController, loginController, testController, forgotPasswordController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//routing object
const router = express.Router()

//swagger api documentation
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phone
 *         - address
 *         - answer
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         answer:
 *           type: string
 */


/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       500:
 *         description: Error in registration
 */


//routing
//REGISTER || METHOD POST
router.post('/register',registerController)

//LOGIN || METHOD POST 
router.post('/login', loginController)

//FORGOT PASSWORD
router.post('/forgot-password', forgotPasswordController)

//Test
router.get('/test',requireSignIn,isAdmin,testController)

//protected user-routes
router.get('/user-auth', requireSignIn, (req,res) =>{
    res.status(200).send({ok:true});
});

//protected admin routes
router.get('/admin-auth', requireSignIn,isAdmin, (req,res) =>{
    res.status(200).send({ok:true});
});

export default router;