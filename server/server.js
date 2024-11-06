//Framework Configuration
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const multer = require("multer");
// disk storage - the engine which gives full control on storing files to the disk
const path = require("path");
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '/uploads'))
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})
var hbs = require("hbs");
hbs.registerPartials(__dirname + '/views/partials',
function (err) {});

const dotenv = require("dotenv");
dotenv.config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/userRoutes"));
app.use('/api/doctor', require("./routes/doctorRoutes"));

// app.use(errorHandler);

// ERROR handling middleware
app.use(errorHandler);



app.set('view engine', 'hbs');


//ROUTES BELOW
app.get('/',(req,res)=>{
    res.send("working");
});

app.get("/home", (req, res) =>{
    res.render("home",{})
})
app.get("/alluser",(req,res)=>{
    res.render("user",{
        users: [
            { username: "Parth", date: "23-10-2024", subject: "Maths" },
            { username: "Aarav", date: "23-10-2024", subject: "Science" },
            { username: "Ishita", date: "23-10-2024", subject: "History" }
        ]
    })
})


app.post('/profile', upload.single('avatar'),  (req,res,next)=>{
    console.log(req.body);
    console.log(req.file);
    // res.send("file uploaded successfully");
    return res.redirect("/home");
})



// APP CONFIG START
app.listen(port, () =>{
    console.log(`Server running in port http://localhost:${port}`);
});