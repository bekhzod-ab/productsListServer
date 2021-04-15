require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const express = require("express")
const path = require("path")
const app = express()
const port = process.env.PORT
const {SaveProduct, DeleteProduct, MarkDone, PrintAll } = require("./productsModule.js")

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
})
.then(() => console.log("connected to DB"))
.then(app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
}))
.catch((error) => console.log(error.message))

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.get("/api/products",async(req,res) => {
    const products = await PrintAll()
    res.status(200).json(products)
})

app.post("/api/save", async(req,res) => {   
    await SaveProduct(req.body.input)
    res.send("added succesefuly")
})

app.put("/api/products/:id", async(req,res) => {
    await MarkDone(req.params.id)
    res.status(200).send()
})

app.delete("/api/products/:id", async(req,res) => {
    await DeleteProduct(req.params.id)
    res.status(200).send()
})

app.use(express.static(path.join(__dirname, "build")))
app.use("/", (req,res) => res.sendFile(path.join(__dirname, "build","index.html")))