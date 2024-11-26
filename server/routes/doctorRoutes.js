const express = require("express");
const router = express.Router();
const { registerDoctor } = require("../controllers/doctorDetailsController"); // Ensure the path is correct

const {validateJwtToken} = require("../middlewares/jwtAutMiddleware")


// Route to register a doctor
router.post("/register",validateJwtToken, registerDoctor);

module.exports = router;