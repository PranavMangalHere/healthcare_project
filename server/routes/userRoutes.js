const express = require("express");
const router = express.Router();
const {generateJwttoken,validateJwtToken} = require("../middlewares/jwtAutMiddleware")

// import {jwtAuthMiddleware} from "../middlewares/jwtAutMiddleware"

const {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login",generateJwttoken,loginUser);
// router.post("/login",loginUser);

// Route for get the user specific data
router.get('/myaccount',validateJwtToken, getUserProfile);

// // Route for updating the user specific data
router.patch("/myaccount",validateJwtToken, updateUserProfile);


module.exports = router;