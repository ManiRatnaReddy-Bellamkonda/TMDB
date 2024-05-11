const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());





const url = 'https://api.themoviedb.org/3/search/movie?query=Shawshank';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTgzODU3NzI3ZjBhZTUyOWE1YTcxODhiZTdmM2VlYSIsInN1YiI6IjY1Zjg1NGNlZWI3OWMyMDE2MzUzZDczOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_Orv0Pry2aWBd_aBoOcp8CMKvNg1TXtV0kIeYToZnU'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('error:' + err));


app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await collection.findOne({ email });
        if (check && await bcrypt.compare(password, check.password)) {


            res.json("exist");
        }
        else {
            res.json("notexist");
        }
    }
    catch (e) {
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
        email: email,
        password: hashedPassword
    };

    try {
        const check = await collection.findOne({ email: email });

        if (check) {
            res.json("exist");
        }
        else {
            res.json("notexist");
            await collection.insertMany([data]);
        }
    }
    catch (e) {
        res.json("fail");
    }
});

app.listen(8000, () => {
    console.log("port connected");
});
