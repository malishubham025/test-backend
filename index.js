const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
const corsOptions = {
    origin: ["https://test-frontend-ebon.vercel.app", "http://127.0.0.1:5173"],
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true
};

app.use(cors(corsOptions));

// Handle preflight OPTIONS requests
app.options("*", cors(corsOptions));

app.use(express.json())

mongoose.connect('mongodb+srv://malishubham025:tkKrRfh726eKX6Yz@cluster0.76o2t.mongodb.net/test').then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("Server is Running")
})
