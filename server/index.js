const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 4000;


// Import Routes
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')

dotenv.config();

// app.use(express.json({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Multer
const multer = require('multer');
const {v4:uuidv4} = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads');
    },
    filename: function(req,file,cb){
        cb(null,uuidv4()+'-'+Date.now()+path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb) => {
    const allowedFileTypes = ['image/jpeg','image/jpg','image/png', 'image/webp'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null,true)
    } else {
        cb(null,false)
    }
}

let upload = multer({storage,fileFilter});

// Routes
app.use('/',userRoute)
app.use('/',upload.single('image'),postRoute)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        console.log('connected to db & listening on port',PORT)
    })
}).catch ((error) => {
    console.log(error) 
})