// // first we are initializing jsonwebtoken module to use functionalities of jwt eg; sign , verify

// const jwt = require('jsonwebtoken')

// // after successful register of user , and then calling the login endpoint with the already registered user, it will create 
// //and return JWT token

// const generateJwttoken = (userData) => {
//     return jwt.sign(userData, process.env.PRIVATE_KEY,{expiresIn:400000});
// }
// // After login , we arre getting the token and for validating the jwt token that it is correct or not , we will proceed with secure routes
// // , to GET/POST/UPDATE/DELETE

// const validateJwtToken = (req,res,next) => {
//     const tokenCheck = req.headers.authorization

//     //Option1: req header token authorization not sent. (Doesn't exists)
//     if(!tokenCheck) return res.status(401).json({err:'Token not available'});

//     //OPTION2: req header getting token: But not in a right format:
//     // Authorization: BASIC / BEARER
//     //Basic btoa(USERNAME:PASSWORD) -> Basic hfewhiudsjf [BASE64]
//     // BEARER fdsdfffgsfdsgreghn
//     const token = req.headers.authorization.split(' ')[1];

//     if(!token){
//         return res.status(401).json({err:'Invalid Token'});
//     }
//     try{
//         const validateToken = jwt.verify(token,process.env.PRIVATE_KEY);

//         req.user = validateToken;
//         next();
//     }catch(err){
//         return res.status(401).json(err.message);
//     }
// }


// module.exports = {generateJwttoken,validateJwtToken};
const jwt = require("jsonwebtoken");

const generateJwttoken = (req, res, next) => {
    const { email } = req.body;
    
    // After validating user credentials (in login), create a token
    if (email) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        req.token = token;  // Attach token for access if needed
        next();
    } else {
        res.status(400).json({ message: "Email is required to generate token" });
    }
};

const validateJwtToken = (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access - token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { generateJwttoken, validateJwtToken };
