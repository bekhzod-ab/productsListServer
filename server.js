require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const port = process.env.PORT || 4004
const {SaveProduct, DeleteProduct, MarkDone, PrintAll } = require("./productsModule.js")

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
})
.then(() => console.log("connected to DB"))
.then(app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
}))
.catch((error) => console.log(error.message))

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.get("/products",async(req,res) => {
    const products = await PrintAll()
    res.status(200).json(products)
})

app.post("/save", async(req,res) => {   
    await SaveProduct(req.body.input)
    res.send("added succesefuly")
})

app.put("/products/:id", async(req,res) => {
    await MarkDone(req.params.id)
    res.status(200).send("Done")
})

