require("dotenv").config()
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        unique: true
    },
    done: {
        type: Boolean,
    }
})

const Products = mongoose.connection.model("products", productSchema)


async function SaveProduct(bodyInput) {
        const Item = new Products({
        item: bodyInput,
        done: false
    })
    Item.save()
    .then(() => console.log(Item + " added"))
    .catch((e) => console.log(e.message))
}

function DeleteProduct(paramsId) {
    return Products.findOneAndRemove({_id: paramsId})
    .then((result)=> console.log(result.item + " was deleted"))
    .catch((e) => console.log(e.message))
}


async function MarkDone(paramsId) {
    const state = await Products.findOne({_id:paramsId })
    
    return Products.findOneAndUpdate({_id: paramsId}, {done: !state.done}, {new: true} )
    .then((result) => console.log(result.item + " is done"))
    .catch((e) => console.log(e.message))
}


function PrintAll(){
    return Products.find({})
    .then((data)=> data)
    // .catch((e) => console.log(e.message))
    
}

module.exports = {
    SaveProduct,
    DeleteProduct,
    MarkDone,
    PrintAll
}