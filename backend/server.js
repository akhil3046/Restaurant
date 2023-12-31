const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const port = 3001

const app = express();

mongoose.connect("mongodb+srv://Ajay-kumar:Ajaykumar$13@cluster0.ofmxz.mongodb.net/akhilcsd");
// app.set("trust proxy", 1);
app.use(cors({
    origin:'*',
    credentials:true,
}));
app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://restaurant-mkn3.onrender.com/");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});
app.use(express.json());
app.use(bodyParser.json());

const restaurantSchema = new mongoose.Schema({
    name: String,
    questions: Array
})
const restaurant = mongoose.model("restaurant", restaurantSchema)


app.get('/all', async (req, res) => {
    try {
        var docs = await restaurant.find({ }).exec();
        res.send(docs);
        // console.log(docs);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error" + error);
    }
})

app.post('/new', async (req, res) => {
    const newRestaurant = new restaurant({
        name: req.body.name,
        questions: req.body.questions
    })
    await newRestaurant.save()

})

app.listen(port, () => {
    console.log("express server is running on port 3001!");
})
